/**
 (c) 2013, 2008 Dian Tresna Nugraha <dian.nugraha@gmail.com>
 Released under GNU Public License
 see: http://www.gnu.org/copyleft/gpl.html
 */

////////////////////////////////////////////////////////////////////////////
/**
 * This array holds the look-up table for conversion from 
 * Latin to Sundanese
 */
var UNISUNDA = new Array();

    // panungtung
    UNISUNDA['+ng'] = '\u1B80';
    UNISUNDA['+r'] = '\u1B81';
    UNISUNDA['+h'] = '\u1B82';
    UNISUNDA['+O'] = '\u1BAA';
    // vokal mandiri
    UNISUNDA['A'] = '\u1B83';
    UNISUNDA['I'] = '\u1B84';
    UNISUNDA['U'] = '\u1B85';
    //'É'] = '\u1B86';
    UNISUNDA['\u00C9'] = '\u1B86';
    UNISUNDA['O'] = '\u1B87';
    UNISUNDA['E'] = '\u1B88';
    UNISUNDA['EU'] = '\u1B89';
    // konsonan ngalagena
    UNISUNDA['k'] = '\u1B8A';
    UNISUNDA['q'] = '\u1B8B';
    UNISUNDA['g'] = '\u1B8C';
    UNISUNDA['ng'] = '\u1B8D';
    UNISUNDA['c'] = '\u1B8E';
    UNISUNDA['j'] = '\u1B8F';
    UNISUNDA['z'] = '\u1B90';
    UNISUNDA['ny'] = '\u1B91';
    UNISUNDA['t'] = '\u1B92';
    UNISUNDA['d'] = '\u1B93';
    UNISUNDA['n'] = '\u1B94';
    UNISUNDA['p'] = '\u1B95';
    UNISUNDA['f'] = '\u1B96';
    UNISUNDA['v'] = '\u1B97';
    UNISUNDA['b'] = '\u1B98';
    UNISUNDA['m'] = '\u1B99';
    UNISUNDA['y'] = '\u1B9A';
    UNISUNDA['r'] = '\u1B9B';
    UNISUNDA['l'] = '\u1B9C';
    UNISUNDA['w'] = '\u1B9D';
    UNISUNDA['s'] = '\u1B9E';
    UNISUNDA['x'] = '\u1B9F';
    UNISUNDA['h'] = '\u1BA0';
    UNISUNDA['kh'] = '\u1BAE';
    UNISUNDA['sy'] = '\u1BAF';
    // konsonan sisip
    UNISUNDA['+ya'] = '\u1BA1';
    UNISUNDA['+ra'] = '\u1BA2';
    UNISUNDA['+la'] = '\u1BA3';
    // suara vokal 
    UNISUNDA['a'] = '';
    UNISUNDA['i'] = '\u1BA4';
    UNISUNDA['u'] = '\u1BA5';
    //'é'] = '\u1BA6';
    UNISUNDA['\u00E9'] = '\u1BA6';
    UNISUNDA['o'] = '\u1BA7';
    UNISUNDA['e'] = '\u1BA8';
    UNISUNDA['eu'] = '\u1BA9';
    // angka
    UNISUNDA['0'] = '\u1BB0';
    UNISUNDA['1'] = '\u1BB1';
    UNISUNDA['2'] = '\u1BB2';
    UNISUNDA['3'] = '\u1BB3';
    UNISUNDA['4'] = '\u1BB4';
    UNISUNDA['5'] = '\u1BB5';
    UNISUNDA['6'] = '\u1BB6';
    UNISUNDA['7'] = '\u1BB7';
    UNISUNDA['8'] = '\u1BB8';
    UNISUNDA['9'] = '\u1BB9';

////////////////////////////////////////////////////////////////////////////
    
PAT_V      = 1;
PAT_VK     = 2;
PAT_KV     = 3;
PAT_KVK    = 4;
PAT_KRV    = 5;
PAT_KRVK   = 6;
PAT_SILABA = 7;
PAT_LAIN   = 0;

////////////////////////////////////////////////////////////////////////////
function sundaahir (huruf)
////////////////////////////////////////////////////////////////////////////
{
    var retval = ''

    if (huruf == 'h' || huruf == 'r' || huruf == 'ng') {
        retval = UNISUNDA['+' + huruf];
    } else {
        retval = UNISUNDA[huruf] + UNISUNDA['+O'];
    }
    
    return retval;
} // end sundaahir (...)


////////////////////////////////////////////////////////////////////////////
/**
 * This functions converts the Latin input string (iStr) into Sundanese
 */
function Latin2Sunda(iStr)
{    
    var sundaText = '';
    
    iStr = iStr.toLowerCase();

    var iLength = iStr.length;
    var idx = 0;
    var jump = 0;

    var tStr = '';
    var oStr = '';
    var r;
    var silaba;
    var suku;
    var polasuku = PAT_LAIN;
    
    // Pola V, VK, K, KV, KVK, KRV, KRVK:
    var KONS = 'kh|sy|[b-df-hj-mp-tv-z]|ng|ny|n';
    var VOK  = "[aiuo\u00E9]|eu|e";
    //VOK  = '[aiuoé]|eu|e';
    var REP  = '[yrl]';
    var SILABA = '^';
    SILABA += '('+KONS+')?';             // group(1), K
    SILABA += '('+REP+')?';              // group(2), R
    SILABA += '('+VOK+')';               // group(3), V
    SILABA += '('+KONS+')?';             // group(4), K
    SILABA += '('+VOK+'|'+REP+')?';      // group(5), V|R
    KONSONAN = '^('+KONS+')';
    var DIGIT = '^([0-9]+)';
    
    while (idx < iLength) {
        suku = ''
        r = iStr.match(SILABA)
        if (r !== null) {
            // cari pola:
            if (r[1]) { // != undefined) {
                if (r[4]) { // != undefined) {
                    if (r[2]) { // != undefined) {
                        if (r[5]) { // != undefined) {
                            polasuku = PAT_KRV;
                        } else {
                            polasuku = PAT_KRVK;
                        }
                    } else {
                        if (r[5]) { // != undefined) {
                            polasuku = PAT_KV;
                        } else {
                            polasuku = PAT_KVK;
                        }
                    }
                } else {
                    if (r[2]) { // != undefined) {
                        polasuku = PAT_KRV;
                    } else {
                        polasuku = PAT_KV;
                    }
                }
            } else {
                if (r[4]) { // != undefined) {
                    if (r[5]) { // != undefined) {
                        polasuku = PAT_V;
                    } else {
                        polasuku = PAT_VK;
                    }
                } else {
                    polasuku = PAT_V;
                }
            }
            
            // bentuk:
            if (polasuku == PAT_KRVK) {
                suku = r[1] + r[2] + r[3] + r[4];
                silaba  = UNISUNDA[r[1]];
                silaba += UNISUNDA['+' + r[2] + 'a'];
                silaba += UNISUNDA[r[3]];
                silaba += sundaahir(r[4]);
            } else if (polasuku == PAT_KRV) {
                suku = r[1] + r[2] + r[3];
                silaba  = UNISUNDA[r[1]];
                silaba += UNISUNDA['+' + r[2] + 'a'];
                silaba += UNISUNDA[r[3]];
            } else if (polasuku == PAT_KVK) {
                suku = r[1] + r[3] + r[4];
                silaba  = UNISUNDA[r[1]];
                silaba += UNISUNDA[r[3]];
                silaba += sundaahir(r[4]);
            } else if (polasuku == PAT_KV) {
                suku = r[1] + r[3];
                silaba  = UNISUNDA[r[1]];
                silaba += UNISUNDA[r[3]];
            } else if (polasuku == PAT_VK) {
                suku = r[3] + r[4];
                silaba  = UNISUNDA[r[3].toUpperCase()];
                silaba += sundaahir(r[4]);
            } else {
                suku = r[3];
                silaba = UNISUNDA[suku.toUpperCase()];
            } // end if
            oStr += silaba //+ ':'
            tStr += suku + '(' + polasuku + '):';
            polasuku = PAT_SILABA;
        } else {
            r = iStr.match(KONSONAN);
            if (r != null) {
                suku   = r[1];
                if (polasuku == PAT_SILABA) {
                    silaba = sundaahir(suku);
                } else {
                    silaba = UNISUNDA[suku] + UNISUNDA['+O'];
                }
                oStr += silaba;
                tStr += suku + ";";
            } else {
                r = iStr.match(DIGIT);
                if (r != null) {
                    silaba = '|';
                    suku = r[1];
                    l = suku.length;
                    i = 0;
                    while (i<l) {
                        silaba += UNISUNDA[suku.substr(i,1)];
                        i += 1;
                    } //end while
                    silaba += '|';
                    oStr += silaba;
                } else {
                    suku = iStr.substr(0,1);
                    silaba = suku;
                    oStr += suku;
                }
                //end if
                tStr += suku + '(?)';
            } // end if
            polasuku = PAT_LAIN;
        }// end if
        iStr = iStr.substr(suku.length);
        idx += suku.length;
    
    }// end while

    //return tStr + '&&' + oStr
    return oStr;
    //return tStr
}

////////////////////////////////////////////////////////////////////////////
/**
 * This array holds the look-up table for conversion from 
 * Sundanese to Latin
 */
var SUNDAUNI = new Array()

    // konsonan ngalagena
    SUNDAUNI['\u1B8A'] = 'k' ;
    SUNDAUNI['\u1B8B'] = 'q' ;
    SUNDAUNI['\u1B8C'] = 'g' ;
    SUNDAUNI['\u1B8D'] = 'ng' ;
    SUNDAUNI['\u1B8E'] = 'c' ;
    SUNDAUNI['\u1B8F'] = 'j' ;
    SUNDAUNI['\u1B90'] = 'z' ;
    SUNDAUNI['\u1B91'] = 'ny' ;
    SUNDAUNI['\u1B92'] = 't' ;
    SUNDAUNI['\u1B93'] = 'd' ;
    SUNDAUNI['\u1B94'] = 'n' ;
    SUNDAUNI['\u1B95'] = 'p' ;
    SUNDAUNI['\u1B96'] = 'f' ;
    SUNDAUNI['\u1B97'] = 'v' ;
    SUNDAUNI['\u1B98'] = 'b' ;
    SUNDAUNI['\u1B99'] = 'm' ;
    SUNDAUNI['\u1B9A'] = 'y' ;
    SUNDAUNI['\u1B9B'] = 'r' ;
    SUNDAUNI['\u1B9C'] = 'l' ;
    SUNDAUNI['\u1B9D'] = 'w' ;
    SUNDAUNI['\u1B9E'] = 's' ;
    SUNDAUNI['\u1B9F'] = 'x' ;
    SUNDAUNI['\u1BA0'] = 'h' ;
    SUNDAUNI['\u1BAE'] = 'kh' ;
    SUNDAUNI['\u1BAF'] = 'sy' ;
    
    // sora vokal
    SUNDAUNI['\u1BA4'] = 'i' ;
    SUNDAUNI['\u1BA5'] = 'u' ;
    SUNDAUNI['\u1BA6'] = '\u00E9' ; // 'é'
    SUNDAUNI['\u1BA7'] = 'o' ;
    SUNDAUNI['\u1BA8'] = 'e' ;
    SUNDAUNI['\u1BA9'] = 'eu' ;
    SUNDAUNI['\u1BAA'] = '' ;

    // vokal mandiri        
    SUNDAUNI['\u1B83'] = 'a' ;
    SUNDAUNI['\u1B84'] = 'i' ;
    SUNDAUNI['\u1B85'] = 'u' ;
    SUNDAUNI['\u1B86'] = '\u00E9' ; // 'É';
    SUNDAUNI['\u1B87'] = 'o' ;
    SUNDAUNI['\u1B88'] = 'e' ;
    SUNDAUNI['\u1B89'] = 'eu' ;
    
    // konsonan sisip
    SUNDAUNI['\u1BA1'] = 'y' ;
    SUNDAUNI['\u1BA2'] = 'r' ;
    SUNDAUNI['\u1BA3'] = 'l' ;
    
    // panungtung
    SUNDAUNI['\u1B80'] = 'ng' ;
    SUNDAUNI['\u1B81'] = 'r' ;
    SUNDAUNI['\u1B82'] = 'h' ;

    // angka
    SUNDAUNI['\u1BB0'] = '0'  ;
    SUNDAUNI['\u1BB1'] = '1'  ;
    SUNDAUNI['\u1BB2'] = '2'  ;
    SUNDAUNI['\u1BB3'] = '3'  ;
    SUNDAUNI['\u1BB4'] = '4'  ;
    SUNDAUNI['\u1BB5'] = '5'  ;
    SUNDAUNI['\u1BB6'] = '6'  ;
    SUNDAUNI['\u1BB7'] = '7'  ;
    SUNDAUNI['\u1BB8'] = '8'  ;
    SUNDAUNI['\u1BB9'] = '9'  ;
////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////
/**
 * This functions converts the Sundanese input string (iStr) into Latin
 */
function Sunda2Latin(iStr)
{
    var iLength = iStr.length;
    var idx = 0;
    var jump = 0;

    var tStr = '';
    var oStr = '';

    // Pola KRV0K:
    var NGALAGENA    = '([\u1B8A-\u1BA0\u1BAE\u1BAF])';
    var VOKALMANDIRI = '([\u1B83-\u1B89])';
    var SUBJOIN      = '([\u1BA1-\u1BA3])?';
    var VOKAL        = '([\u1BA4-\u1BAA])?';
    var TUNGTUNG     = '([\u1B80-\u1B82])?';
    var ANGKA        = '([\u1BB0-\u1BB9])';
    
    var KRV0K = '^'+NGALAGENA+SUBJOIN+VOKAL+TUNGTUNG;
    var VK    = '^'+VOKALMANDIRI+TUNGTUNG;
    var angka = '^(\\|)?'+ANGKA+'(\\|)?';
    
    var suku;
    var silaba;
    var r;

    while (idx < iLength) {
        suku = '';
        silaba = '';
        r = iStr.match(KRV0K);
        if (r != null) {
            // K
            suku    += r[1];
            silaba  += SUNDAUNI[r[1]];
            if (r[2]) { // != undefined) {
                // KR
                suku   += r[2];
                silaba += SUNDAUNI[r[2]];
            } //end if
            if (r[3]) { // != undefined) {
                // K(R)V
                suku   += r[3];
                silaba += SUNDAUNI[r[3]];
            } else {
                silaba += 'a';
            } //end if
            if (r[4]) { // != undefined) {
                // K(R)(V)(K)
                suku   += r[4];
                silaba += SUNDAUNI[r[4]];
            } //end if
            oStr += silaba;
            tStr += suku + ':';
            //end if
        } else {
            r = iStr.match(VK);
            if (r != null) {
                // V
                suku   += r[1];
                silaba += SUNDAUNI[r[1]];
                if (r[2]) { // != undefined) {
                    // V(K)
                    suku   += r[2];
                    silaba += SUNDAUNI[r[2]];
                } //end if
                oStr += silaba;
                tStr += suku + ':';
            } else {
                r = iStr.match(angka);
                if (r) { // != undefined) {
                    //angka:
                    if (r[1]) { // != undefined) {
                        suku += r[1];
                    }//end if
                    suku += r[2];
                    oStr += SUNDAUNI[r[2]];
                    if (r[3]) { // != undefined) {
                        suku += r[3];
                    }//end if
                } else {
                    suku += iStr.substr(0,1);
                    oStr += suku;
                    tStr += suku + '(?)';
                } //end if
            }//end if
        }// end if
        iStr = iStr.substr(suku.length);
        idx += suku.length;
    }// end while

    //return tStr + '&&' + oStr
    return oStr;
    //return tStr
}

var locked = false

////////////////////////////////////////////////////////////////////////////
/**
 * This functions handles the UI event for conversion from Latin to Sunda
 */
function btSunda2Latin()
{
    if (locked == false)
    {
    
        locked = true
        
        var sundaText = document.getElementById('SundaText').value
    
        var latinText = Sunda2Latin(sundaText);
        
        document.getElementById('LatinText').value = latinText;
    
        locked = false
    }
}


////////////////////////////////////////////////////////////////////////////
/**
 * This functions handles the UI event for conversion from Latin to Sunda
 */
function btLatin2Sunda()
{
    if (locked == false)
    {
    
        locked = true;
        
        var latinText = document.getElementById('LatinText').value;
        
        var sundaText = Latin2Sunda(latinText);        
        
        document.getElementById('SundaText').value = sundaText;
        
        locked = false;
    }
}



////////////////////////////////////////////////////////////////////////////
function setBg(id,color)
{
    document.getElementById(id).style.background = color;
}
