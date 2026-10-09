import json, subprocess, sys, numpy as np, soundfile as sf
src, out_wav, tl_out = sys.argv[1:4]
SR = 48000; TEMPO = 1.0; PAD = 0.06; GAP = 0.45; LEAD = 0.25; TAIL = 1.4
segs = [[0.0,3.58,"שוב נשרפה לך | כל המכסה בקלוד, | אחרי שעה של עבודה?"],
 [4.05,7.10,"אתה משלם | עשרים דולר בחודש, | נתקע באמצע משימה,"],
 [7.39,9.68,"ומקבל תשובות גנריות | ולא מדויקות."],
 [10.18,11.79,"הסוד הוא | לעבוד עם שיטה."],
 [12.27,15.84,"לדעת מתי לעבוד | בשיחה, | בעוזר האישי | או בקלוד קוד."],
 [16.35,19.96,"לתכנן עם אופוס | ולבצע עם סונט, | כדי שהמכסה תחזיק."],
 [20.40,23.55,"ולהפעיל סקילים | שמריצים עבודה שלמה | במשפט אחד."],
 [24.10,28.30,"ריכזתי את | חמשת כללי הזהב | ואת כל המדריך | לקלוד קוד | במקום אחד."],
 [28.62,29.52,"חינם לגמרי."],
 [29.89,32.37,"תגיבו \"קלוד\", | והקישור | אצלכם בפרטי."]]
subprocess.run(['ffmpeg','-v','error','-y','-i',src,'-ac','1','-ar',str(SR),'raw.wav'],check=True)
a,_ = sf.read('raw.wav', dtype='float32'); fade = int(0.01*SR)
out = [np.zeros(int(LEAD*SR),dtype='float32')]; t = LEAD; lines = []
for i,(s,e,text) in enumerate(segs):
    if i: out.append(np.zeros(int(GAP*SR),dtype='float32')); t += GAP
    c = a[int(max(0,s-PAD)*SR):int(min(len(a)/SR,e+PAD)*SR)].copy()
    c[:fade] *= np.linspace(0,1,fade); c[-fade:] *= np.linspace(1,0,fade)
    lines.append([t, t+len(c)/SR, text]); out.append(c); t += len(c)/SR
out.append(np.zeros(int(TAIL*SR),dtype='float32')); t += TAIL
sf.write('cut.wav', np.concatenate(out), SR)
# speed up slightly (pitch kept), clean, then normalise speech to exactly -14 LUFS (two-pass)
pre = f'atempo={TEMPO},highpass=f=80,afftdn=nf=-25,acompressor=threshold=-20dB:ratio=3:attack=5:release=80'
m = subprocess.run(['ffmpeg','-hide_banner','-i','cut.wav','-af',pre+',loudnorm=I=-14:TP=-1.5:LRA=9:print_format=json','-f','null','-'],capture_output=True,text=True).stderr
j = json.loads(m[m.rindex('{'):m.rindex('}')+1])
ln = f"loudnorm=I=-14:TP=-1.5:LRA=9:measured_I={j['input_i']}:measured_TP={j['input_tp']}:measured_LRA={j['input_lra']}:measured_thresh={j['input_thresh']}:offset={j['target_offset']}:linear=true"
subprocess.run(['ffmpeg','-v','error','-y','-i','cut.wav','-af',pre+','+ln,'-ar','48000',out_wav],check=True)
dur = t/TEMPO
tl = {'1': {'duration': round(dur,3), 'lines': [[round(s/TEMPO,3), round(e/TEMPO,3), x] for s,e,x in lines]}}
json.dump(tl, open(tl_out,'w'), ensure_ascii=False, indent=1)
print('duration', round(dur,2))
