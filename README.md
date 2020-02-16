# moxy-mixer

JS obfuscation utility

## Usage

```
const MoxyMixer = require('../moxy-mixer')
console.log(MoxyMixer(testFile))
```

Example output:

```
const t = (s) => s[D("%72%65%70%6c%61%63%65")](/\x([0-9a-f]{2})/g, (_, _p) => String[D("%66%72%6f%6d%43%68%61%72%43%6f%64%65")](parseInt(_p, 16)));const D = decodeURIComponent;const l = t('\x62\x6c\x61\x68');const K = t('\x74\x65\x73\x74');const b = D('%68%65%6c%6c%6f');const O = t('\x74\x61\x62\x6c\x65');const o = t('\x74\x6f\x53\x74\x72\x69\x6e\x67');const r = t('\x6c\x6f\x67');const R = console[O];const X = console[r];let z = t('\x68\x65\x6c\x6c\x6f\x20\x77\x6f\x72\x6c\x64\x21');let F = D('%74%68%69%73%20%69%73%20%61%20%74%65%73%74%20%6d%73%67%20%74%6f%20%73%65%65%20%69%66%20%69%74%20%72%65%70%6c%61%63%65%73');function C(z) {X(z[o]());};const a = () => t('\x74\x65\x73\x74');function T(z) {X(z
+ t('\x21'));};const y = () => {return t('\x62\x6f\x6f');};const L = z => `${z}!!`;C(z);T(L(z));X(y());X(a());function U() {X(D('%48%45%4c%4c%4f%20%57%4f%52%4c%44%21%21%21%21'));};U();class Y {constructor() {X(D('%63%6f%6e%73%74%72%75%63%74%6f%72%20%74%65%73%74'));}hello() {X(t('\x68\x69\x20\x74\x68\x65\x72\x65'));}get d() {return 1;}static H() {R([D('%77%6f%61%68'), D('%74%68%69%73'), D('%69%73'), t('\x63\x6f\x6f\x6c')]);}};var d = new Y();d[b]();X(d.d);Y.H();
```

## Bugs

-   This may contain bugs as it has not been extensively tested yet. Please be patient, thanks!
