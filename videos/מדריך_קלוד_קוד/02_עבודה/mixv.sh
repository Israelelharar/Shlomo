#!/bin/bash
# voice (already -14 LUFS) + ducked music + sfx, then two-pass loudnorm of the mix to -14 LUFS / TP -1.2
v=$1; len=${2:-}
T=""; [ -n "$len" ] && T="-t $len"
F="[0:a]aresample=48000,asplit=2[vo][key];[1:a]volume=0.45[m];[m][key]sidechaincompress=threshold=0.02:ratio=8:attack=20:release=300:makeup=1[md];[2:a]volume=0.55[s];[vo][md][s]amix=inputs=3:normalize=0:duration=first"
J=$(ffmpeg -hide_banner $T -i voice$v.wav $T -i music$v.wav $T -i sfx$v.wav -filter_complex "$F,loudnorm=I=-14:TP=-1.2:LRA=11:print_format=json" -f null - 2>&1 | sed -n '/^{/,/^}/p')
g(){ echo "$J" | grep "\"$1\"" | sed -E 's/.*: "([^"]+)".*/\1/'; }
ffmpeg -v error -y $T -i voice$v.wav $T -i music$v.wav $T -i sfx$v.wav -filter_complex "$F,loudnorm=I=-14:TP=-1.2:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true[out]" -map "[out]" -ar 48000 -c:a aac -b:a 192k mix$v.m4a
