
let block_number = 0;
let block_number2 = 0;
let min = 0;
let max = 50;
async function diff(){
    $('#result5').empty();
    block_number = parseInt($('#block_number').val())
    block_number2 = parseInt($('#block_number').val()) - parseInt($('#block_number2').val())
    console.log(block_number2)
    // min = parseInt($('#min').val())
    // max = parseInt($('#max').val())
    let dd = await ee();
    let persent_normal = (dd.normal_one/(dd.normal_one+dd.normal_zero)*100).toFixed(2)
    let persent_normal2 = (dd.normal_zero/(dd.normal_one+dd.normal_zero)*100).toFixed(2)
    let persent_power = (dd.power_one/(dd.power_one+dd.power_zero)*100).toFixed(2)
    let persent_power2 = (dd.power_zero/(dd.power_one+dd.power_zero)*100).toFixed(2)

    let persent_n_under = (dd.normal_under/(dd.normal_under+dd.normal_over)*100).toFixed(2)
    let persent_n_over = (dd.normal_over/(dd.normal_under+dd.normal_over)*100).toFixed(2)
    let persent_p_under = (dd.power_under/(dd.power_under+dd.power_over)*100).toFixed(2)
    let persent_p_over = (dd.power_over/(dd.power_under+dd.power_over)*100).toFixed(2)

    let persent_small = (dd.small/(dd.small+dd.midium+dd.large)*100).toFixed(2)
    let persent_midium = (dd.midium/(dd.small+dd.midium+dd.large)*100).toFixed(2)
    let persent_large = (dd.large/(dd.small+dd.midium+dd.large)*100).toFixed(2)
    //mirror
    // $('#result').text('일반 홀 : '+persent_normal2+'%'+' 일반 짝 : '+persent_normal+'%')
    // $('#result2').text('파워 홀 : '+persent_power2+'%'+' 파워 짝 : '+persent_power+'%')
    // $('#result3').text('일반 언더 : '+persent_n_over+'%'+' 일반 오버 : '+persent_n_under+'%')
    // $('#result4').text('파워 언더 : '+persent_p_over+'%'+' 파워 오버 : '+persent_p_under+'%')
    // $('#result6').text('소 : '+persent_small+'%'+' 중 : '+persent_midium+'%'+' 대 : '+persent_large+'%')

    //original
    $('#result').text('일반 홀 : '+persent_normal+'%'+' 일반 짝 : '+persent_normal2+'%')
    $('#result2').text('파워 홀 : '+persent_power+'%'+' 파워 짝 : '+persent_power2+'%')
    $('#result3').text('일반 언더 : '+persent_n_under+'%'+' 일반 오버 : '+persent_n_over+'%')
    $('#result4').text('파워 언더 : '+persent_p_under+'%'+' 파워 오버 : '+persent_p_over+'%')
    $('#result6').text('소 : '+persent_small+'%'+' 중 : '+persent_midium+'%'+' 대 : '+persent_large+'%')


    //past
    // $('#result').text('일반 홀 : '+dd.normal_one+'('+persent_normal+'%)'+' 일반 짝 : '+dd.normal_zero+'('+persent_normal2+'%)')
    // $('#result2').text('파워 홀 : '+dd.power_one+'('+persent_power+'%)'+' 파워 짝 : '+dd.power_zero+'('+persent_power2+'%)')
    // $('#result3').text('일반 언더 : '+dd.normal_under+'('+persent_n_under+'%)'+' 일반 오버 : '+dd.normal_over+'('+persent_n_over+'%)')
    // $('#result4').text('파워 언더 : '+dd.power_under+'('+persent_p_under+'%)'+' 파워 오버 : '+dd.power_over+'('+persent_p_over+'%)')
} 

async function ee() {
    try{
        block_number = block_number + block_number2
        console.log(block_number)
        let normal_zero = 0;
        let normal_one = 0;
        let power_zero = 0;
        let power_one = 0;
        let normal_under = 0;
        let normal_over = 0;
        let power_under = 0;
        let power_over = 0;
        let small = 0;
        let midium = 0;
        let large = 0;
        let numbers = [];

        let result = { normal : '', power : ''}
        for(y=min; y < max+1; y++){
            console.log(min,max,y,'---------------------------------------------')
            // let random_data = randomString()
            // console.log(random_data)

            // let temp_hash = randomString();
            // console.log('temp_hash',temp_hash)
           
            let temp_hash = SHA256(''+ SHA256(''+(block_number-block_number2)) + y);
            temp_hash = temp_hash.slice(-5, temp_hash.length)
            let temp_result = temp_hash.toUpperCase()
            $('#result5').append(''+temp_result+'&')

            let test = await main_e((block_number),temp_result);
            if(test.normal == 0){
                normal_zero++
            }else if(test.normal == 1){
                normal_one++
            }

            if(test.power == 0){
                power_zero++
            }else if(test.power == 1){
                power_one++
            }

            if(test.normal_unob == 0){
                normal_under++
            }else if(test.normal_unob == 1){
                normal_over++
            }

            if(test.power_unob == 0){
                power_under++
            }else if(test.power_unob == 1){
                power_over++
            }

            if(test.smallTolarge == 0){
                small++
            }else if(test.smallTolarge == 1){
                midium++
            }else if(test.smallTolarge == 2){
                large++
            }

        }
        if(normal_one > normal_zero){
            result.normal = "홀"
        }else if (normal_one < normal_zero){
            result.normal = "짝"
        }
        if(power_one > power_zero){
            result.power = "홀"
        }else if (power_one < power_zero){
            result.power = "짝"
        }
        console.log('일반 홀',normal_one,'일반 짝',normal_zero)
        console.log('파워 홀',power_one,'파워 짝',power_zero)
        console.log('일반 언더',normal_under,'일반 오버',normal_over)
        console.log('파워 언더',power_under,'파워 오버',power_over)
        console.log('대',large,'중',midium,'소',small)
        return {
            'normal_one':normal_one,
            'normal_zero':normal_zero,
            'power_one':power_one,
            'power_zero':power_zero,
            'normal_under' : normal_under,
            'normal_over' : normal_over,
            'power_under' : power_under,
            'power_over' : power_over,
            'small' : small,
            'midium' : midium,
            'large' : large
        }
    }catch(e){
        console.log(e)
    }
};

async function main_e(block_number,transaction){
    return new Promise((r)=>{
        //블록,트랜잭션,생성개수,맥스넘버
        let a = createNumberSet(block_number,transaction,5,28)
        let b = normalBall(a)
        let c = powerBall(a[a.length - 1])
        let d = normalBallUnderOver(a)
        let e = PowerUnderOver(a[a.length - 1])
        let f = smallTolarge(a)
        // console.log(a)
        // console.log(b)
        // console.log(c)
        return r({
            numbers:a,
            normal:b,
            power:c,
            normal_unob:d,
            power_unob:e,
            smallTolarge:f
        })
    })
}
function smallTolarge(arr){
    number = 0;
    for(i=0; i<arr.length-1; i++){
        number = number + arr[i]
    }
    if(number < 65){
        return 0;
    }else if(number < 81){
        return 1;
    }else if(number < 131){
        return 2;
    }
}

function normalBallUnderOver(arr){
    number = 0;
    for(i=0; i<arr.length-1; i++){
        number = number + arr[i]
    }
    if(number < 72.5){
        return 0;
    }else{
        return 1;
    }
}

function PowerUnderOver(num){
    if(num < 4.5){
        return 0;
    }else{
        return 1;
    }
}

function getRandomInt(min, max) { //min ~ max 사이의 임의의 정수 반환
    return Math.floor(Math.random() * (max - min)) + min;
}

function normalBall(arr){
    let number = 0;
    for(i=0; i<arr.length-1; i++){
        number = number + arr[i]
    }
    if(number % 2 == 0){
        //console.log("일반볼 : 짝")
        return 0
    }else{
        //console.log("일반볼 : 홀")
        return 1
    }
}

function powerBall(num){
    if(num % 2 == 0){
        //console.log("파워볼 : 짝")
        return 0
    }else{
        //console.log("파워볼 : 홀")
        return 1
    }
}

/**
 * @param eos_value   : 이오스 조합 문자열
 * @param entry       : 생성할 숫자 갯수
 * @param max_number  : 숫자 최대값 (1부터 시작)
 */
function createNumberSet(eos_block, eos_tran, entry, max_number, start_cnt = 1) {
    eos_tran = eos_tran ? eos_tran : '';
    let eos_value = eos_block + '' + eos_tran;
    //let eos_value = eos_block + '' + eos_tran;
    let hashs = [];
    let numbers = [];
    let count = 0;
    let str = '';
    let str_class = entry == 22 ? 'speedkeno' : 'powerball';
    start_cnt = start_cnt ? start_cnt : 0;

    for(let i=start_cnt; i<1000; i++) {
        hashs[i] = SHA256(eos_value + '' + i);
        console.log(hashs[i])
        let sum = makeSumFromHash(hashs[i]);
        let number = makeNumberFromHash(hashs[i], max_number);
        // 중복 숫자 체크
        if(numbers.indexOf(number) == -1) {
            numbers[count] = number;
            count++;

            if(entry == 1) {
                number = number - 1;
            }
            let str_plus = '';
            if(max_number != 10) str_plus = ' +1';
            console.log(eos_block + '(EOS블록번호)' + eos_tran+ '(트랜젝션수)' + number + '(hash 숫자합계 : ' + sum + ' 을 '  + max_number + ' 로 나눈 나머지값' + str_plus + ')');
        } else {
            console.log(number + '(중복값 이어서 패스!!)</span>')
        }

        //console.log(eos_block + '(EOS블록번호)' + eos_tran+ '(트랜젝션수)' + i +'(증가값) = '+(eos_value + '' + i))
        if(count >= entry) break;
    }
    // 숫자 리스트 정렬
    // numbers.sort(function(a, b) { return a - b; });
    let powerball = SHA256(eos_value + '' + 0);
    let sum = makeSumFromHash(powerball);
    let number = makeNumberFromHash(powerball, 10) - 1;
    numbers.push(number)
    //console.log(eos_block + '(EOS블록번호)' + eos_tran+ '(트랜젝션수)' +  number + '(hash 숫자합계 : ' + sum + ' 을 '  + 10 + ' 로 나눈 나머지값)');
    return numbers;
}

// 해시문자열을 모두 더한 값을 반환
function makeSumFromHash(hash) {
    let arrHash = hash.toString().split('');
    let sum = 0;

    for(let i=0; i<arrHash.length; i++) {
        let number = parseInt(arrHash[i], 16);
        sum = sum + number;
    }

    return sum;
}

// 해시문자열을 모두 더한 값을 최대값으로 나눈 나머지 반환
function makeNumberFromHash(hash, max) {
    let arrHash = hash.toString().split('');
    let sum = 0;

    for(let i=0; i<arrHash.length; i++) {
        let number = parseInt(arrHash[i], 16);
        sum = sum + number;
    }

    return sum % max + 1;
}

// SHA256 해시 함수
function SHA256(s){
    var chrsz   = 8;
    var hexcase = 0;

    function safe_add (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
    function R (X, n) { return ( X >>> n ); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

    function core_sha256 (m, l) {

        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1,
            0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
            0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786,
            0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
            0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147,
            0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
            0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B,
            0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
            0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A,
            0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
            0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);

        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);

        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;

        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;

        for ( var i = 0; i<m.length; i+=16 ) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];

            for ( var j = 0; j<64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }

            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }

    function str2binb (str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
        }
        return bin;
    }

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }

    function binb2hex (binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
                hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
        }
        return str;
    }

    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}

function randomString() {
    var chars = "0123456789ABCDEF";
    var string_length = 5;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
}