const userEncodeInput = document.getElementById('userEncodeInput');
const cipherEncodeKey = document.getElementById('cipherEncodeKey');
const cipherEncodeOutput = document.getElementById('cipherEncodeOutput');
const userDecodeInput = document.getElementById('userDecodeInput');
const cipherDecodeKey = document.getElementById('cipherDecodeKey');
const cipherDecodeOutput = document.getElementById('cipherDecodeOutput');
const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

const caesarCipherEncode = (input, key = 0) => {
  if (input.length === 0) {
    cipherEncodeOutput.innerText = '';
    return;
  }
  const splitInput = input.split('');
  const testMap = splitInput.map(x => {

    if (alphabet.indexOf(x.toLowerCase()) === -1) {

      return ' ';
    }
    
    
    let y = parseInt(alphabet.indexOf(x.toLowerCase())) + parseInt(key);

    if (y > 25) {
      if(x === x.toUpperCase()) {
        let output = alphabet[y-26];
        output = output.toUpperCase();
        return output;
      } else {
        return alphabet[y-26];
      }
    } else {
      if(x === x.toUpperCase()) {
        let output = alphabet[y];
        output = output.toUpperCase();
        return output;
      } else {
        return alphabet[y];
      }
    }
   });
  cipherEncodeOutput.innerText = testMap.join('');
}

userEncodeInput.oninput = () => {
  caesarCipherEncode(userEncodeInput.value, cipherEncodeKey.value);
}

cipherEncodeKey.oninput = () => {
  caesarCipherEncode(userEncodeInput.value, cipherEncodeKey.value);
}

const caesarCipherDecode = (input, key = 0) => {
  if (input.length === 0) {
    cipherDecodeOutput.innerText = '';
    return;
  }
  const splitInput = input.split('');
  const testMap = splitInput.map(x => {
    if (alphabet.indexOf(x.toLowerCase()) === -1) {
      return ' ';
    }
    let y = parseInt(alphabet.indexOf(x.toLowerCase())) - parseInt(key);
    if (y < 0) {
      if (x === x.toUpperCase()) {
        let output = alphabet[26+y];
        output = output.toUpperCase();
        return output;
      } else {
        return alphabet[26+y];
      }
      
    } else {
      if (x === x.toUpperCase()) {
        let output = alphabet[y];
        output = output.toUpperCase();
        return output;
      } else {
        return alphabet[y];
      }
    }
   });
  cipherDecodeOutput.innerText = testMap.join('');
}

userDecodeInput.oninput = () => {
  caesarCipherDecode(userDecodeInput.value, cipherDecodeKey.value);
}

cipherDecodeKey.oninput = () => {
  caesarCipherDecode(userDecodeInput.value, cipherDecodeKey.value);
}

/////////////////////////////////////////////////////////////////////

//Affine Cipher


function Encrypt(f) {
	var word, newword, code, newcode, newletter
	var addkey, multkey
	word = f.p.value
	word = word.toLowerCase()
	word = word.replace(/\W/g, "")
	addkey = 0
	
	for (i=0; i < f.add.options.length; i++) {
		addkey = addkey + (f.add.options[i].text)*(f.add.options[i].selected)
	}
	
	multkey = 0
	
	for (i=0; i < f.mult.options.length; i++) {
		multkey = multkey + (f.mult.options[i].text)*(f.mult.options[i].selected)
	}
	
	newword = ""
	
	for (i = 0; i < word.length; i++) {
		code = word.charCodeAt(i) - 97
		newcode = ( (multkey*code + addkey) % 26 ) + 97
		newletter = String.fromCharCode(newcode)
		newword = newword + newletter
	}
	
	f.c.value = newword + " "
}

function Decrypt(f) {
	var word, newword, code, newcode, newletter
	var addkey, multkey, multinverse
	
	word = f.c.value
	word = word.toLowerCase()
	word = word.replace(/\W/g, "")
	addkey = 0
	
	for (i=0; i < f.add.options.length; i++) {
		addkey = addkey + (f.add.options[i].text)*(f.add.options[i].selected)
	}
	
	multkey = 0
	
	for (i=0; i < f.mult.options.length; i++) {
		multkey = multkey + (f.mult.options[i].text)*(f.mult.options[i].selected)
		//if (i==3) alert(multkey +" + "+f.mult.options[i].text + " * " + f.mult.options[i].selected+" = "+(f.mult.options[i].text) * ( f.mult.options[i].selected));
	}
	
	multinverse = 1
	
	for (i=1; i <= 25; i = i + 2) {
		if ( (multkey*i) % 26 == 1 ) { multinverse = i }
	}
	
	newword = ""
	
	for (i = 0; i < word.length; i++) {
		code = word.charCodeAt(i) - 97
		newcode = ( (multinverse*(code + 26 - addkey)) % 26 ) + 97
		newletter = String.fromCharCode(newcode)
		newword = newword + newletter
	}
	
	f.p.value = newword.toLowerCase()
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Vigenere Cipher


var Vigenere = (function(){
    var AcharCode = 'A'.charCodeAt(0);
    var ZcharCode = 'Z'.charCodeAt(0);
    var AZlen = ZcharCode - AcharCode + 1;
    
    function encrypt( text, key, reverse, keepspaces ){    
      var plaintext = keepspaces ? text : text.replace( /\s+/g, '' );
      var messageLen = plaintext.length;
      var keyLen = key.length;
      var enctext = '';
      var encriptionDir = reverse ? ( -1 * AZlen ) : 0;
      
      for( var i = 0; i < messageLen; i++ ){
        var plainLetter = plaintext.charAt(i).toUpperCase();
        if( plainLetter.match(/\s/) ){
          enctext += plainLetter;
          continue;
        }
        
        var keyLetter = key.charAt( i % keyLen ).toUpperCase();
        var vigenereOffset = keyLetter.charCodeAt(0) - AcharCode;
        var encLetterOffset =  ( plainLetter.charCodeAt(0) - AcharCode + Math.abs( encriptionDir + vigenereOffset ) ) % AZlen;
        
        enctext +=  String.fromCharCode( AcharCode + encLetterOffset );          
      }  
      
      return enctext;
    }
    
    return {
      encrypt : function( text, key,keepspaces ){
        return encrypt( text, key, false, keepspaces );
      },
      
      decrypt : function( text, key, keepspaces ){
        return encrypt( text, key, true, keepspaces );
      }
    };  
  })();
  
  
  
  (function(){
    var $key = document.getElementById('key');
    var $palintext = document.getElementById('palintext');
    var $encryptedtext = document.getElementById('encryptedtext');
    
    var $btnEncript = document.getElementById('btn-encript');
    var $btnDecript = document.getElementById('btn-decript');
    
    
    $btnEncript.addEventListener( 'click', function(){
      var text = Vigenere.encrypt( $palintext.value, $key.value , true );
      $encryptedtext.value = text;
    });
    
    $btnDecript.addEventListener( 'click', function(){
      var text = Vigenere.decrypt( $encryptedtext.value, $key.value , true );
      $palintext.value = text;
    });
  })();

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  //  Colum Transport Cipher

 var chars = "abcdefghijklmnopqrstuvwxyz";

function handleEncrypt() {
    var plaintext = normalize(getById("p").value);
    if (validate(plaintext, 'Please enter some plaintext.')) return;
    var key = normalize(getById("key").value);
    var pc = normalize(getById("pc").value);
    getById("c").value = Encryptt(plaintext, key, pc);
}
function handleDecrypt() {
    var ciphertext = normalize(getById("c").value);
    if (validate(ciphertext, 'Please enter some ciphertext (letters only).')) return;
    var key = normalize(getById("key").value);
    getById("p").value = Decryptt(ciphertext, key);
}

function Encryptt(plaintext, key, pc) {
    var klen = key.length;
    if (pc == "") pc = "x";
    while (plaintext.length % klen != 0) {
        plaintext += pc.charAt(0);
    }
    var colLength = plaintext.length / klen;
    var ciphertext = "";
    k = 0;
    for (i = 0; i < klen; i++) {
        while (k < 26) {
            t = key.indexOf(chars.charAt(k));
            arrkw = key.split("");
            arrkw[t] = "_";
            key = arrkw.join("");
            if (t >= 0) break;
            else k++;
        }
        for (j = 0; j < colLength; j++) {
            ciphertext += plaintext.charAt(j * klen + t);
        }
    }
    return ciphertext;
}

function Decryptt(ciphertext, keyword) {
    var klen = keyword.length;
    if (klen <= 1) {
        alert("keyword should be at least 2 characters long");
        return;
    }
    if (ciphertext.length % klen != 0) {
        alert("ciphertext has not been padded, the result may be incorrect (incorrect keyword?).");
    }
    // first we put the text into columns based on keyword length
    var cols = new Array(klen);
    var colLength = ciphertext.length / klen;
    for (i = 0; i < klen; i++) cols[i] = ciphertext.substr(i * colLength, colLength);
    // now we rearrange the columns so that they are in their unscrambled state
    var newcols = new Array(klen);
    j = 0;
    i = 0;
    while (j < klen) {
        t = keyword.indexOf(chars.charAt(i));
        if (t >= 0) {
            newcols[t] = cols[j++];
            arrkw = keyword.split("");
            arrkw[t] = "_";
            keyword = arrkw.join("");
        } else i++;
    }
    // now read off the columns row-wise
    var plaintext = "";
    for (i = 0; i < colLength; i++) {
        for (j = 0; j < klen; j++) {
            plaintext += newcols[j].charAt(i);
        }
    }
    return plaintext;
}

function validate(text, message) {
    if (text.length < 1) {
        alert(message);
    }
}

function getById(id) {
    return document.getElementById(id);
}

function normalize(value) {
    return value.toLowerCase().replace(/[^a-z]/g, "");
}
 