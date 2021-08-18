const { stdin, stdout } = Deno;
const rbuf = new Uint8Array(1024 * 8);
const wbuf = new Uint8Array(rbuf.length * 2);
const enc = new TextEncoder();

while (true) {
    const n = await stdin.read(rbuf);
    if (n === null) {
        break;
    }

    let p = 0;
    for (const c of rbuf) {
        const s = encode(c);
        if (s !== null) {
            const a = enc.encode(s);
            wbuf.set(a, p);
            p += a.length;
        } else {
            wbuf.set([c], p);
            p += 1;
        }
    }

    let r = p;
    while (r) {
        r -= await stdout.write(wbuf.slice(p - r, p));
    }
}

function encode(c: number): string | null {
    // https://gist.github.com/souri-t/3bb9475c2710a55a10e71337d84ce2c3
    switch (String.fromCharCode(c).toUpperCase()) {
        case 'A': return '𓄿';
        case 'B': return '𓃀';
        case 'C': return '𓎡';
        case 'D': return '𓂧';
        case 'E': return '𓇋';
        case 'F': return '𓆑';
        case 'G': return '𓎼';
        case 'H': return '𓎛';
        case 'I': return '𓇋';
        case 'J': return '𓆓';
        case 'K': return '𓎡';
        case 'L': return '𓃭';
        case 'M': return '𓅓';
        case 'N': return '𓈖';
        case 'O': return '𓍯';
        case 'P': return '𓏤';
        case 'Q': return '𓏘';
        case 'R': return '𓂋';
        case 'S': return '𓋴';
        case 'T': return '𓏏';
        case 'U': return '𓅱';
        case 'V': return '𓆑';
        case 'W': return '𓅱';
        case 'X': return '𓎡𓋴';
        case 'Y': return '𓇋';
        case 'Z': return '𓊃';
        default: return null;
    }
}
