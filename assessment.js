(function(){
    'use strict';
    const userNameInput=document.getElementById('user-name');
    const assessmentButton=document.getElementById('assessment');
    const resultDivided=document.getElementById('result-area');　//result-areaは HTML div id result-areaの要素を取得
    const tweetDivided=document.getElementById('tweet-area');　//tweetDividedは id tweet-area が指定されたdiv要素を取得したもの
    /*  指定した要素の子要素を全て削除する。
    *　@param {HTMLElement} element HTML の要素
    */
   function removeAllChildren(element){
       while (element.firstChild){　//子要素がある限り削除
        element.removeChild(element.firstChild);　 // while 文は 論理式が true を返す場合に実行し続ける制御分。論理式とは true もしくは false の真偽値を返す式。
       }　//今回のwhile の処理内容は診断結果表示エリアに最初の子要素が存在する限り、その最初の子要素を削除し続けるという内容。
   }　　　//この処理をしないと、診断するボタンを何度も押し続けた際に、何度も下に結果を表示し続けてしまう。
    assessmentButton.onclick=()=>{
        const userName=userNameInput.value;
        if(userName.length===0){　//入力された名前が空欄の時は処理を終了する
            return;　//関数の処理の中で return を記述すると「戻り値なしにそこで関数の処理を終了する」という意味になる。ここでは上記のように空欄なら処理を終了、としている
            // このif文のように特定の条件の時に処理を終了させるコードを、「ガード句」と呼ぶ。
            //if と else を使って書くこともできるが、処理をさせたくない条件が増えた時に if の {} の入れ子が深くなってしまうため、それを避けて読みやすくするために使う
        }
        // 診断する を押した後の表示は以下エリアに作成している
        removeAllChildren(resultDivided);　

        const header=document.createElement('h3') //定数 header 宣言。値にはh3の要素を記録。<h3></h3>
        header.innerText='診断結果';　　//header に診断結果 という文字列を代入。 <h3>'診断結果'</h3>
        resultDivided.appendChild(header);　//診断結果を表示するための上記の要素(子要素 : Child)を HTML div 要素に付加(append)する。定数 resultDividedは五行目にて宣言済み

        const paragraph=document.createElement('p');　//p で段落要素を作成、記録
        const result=assessment(userName);　//以前作成した assessment 関数で診断結果の文字列を作成し、
        paragraph.innerText=result;　//paragraph に定数 result の結果を代入
        resultDivided.appendChild(paragraph);

        //todoツイートエリア(練習)
        removeAllChildren(tweetDivided);　

        

    };
    const answers=[ 　　//変数 var ではなく ES6 の定数 const を利用。数値の再代入は不可能
        '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
        '{userName}のいいところは眼差しです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさが物事をいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身が良いところなのです。',
        '{userName}のいいところは自制心です。まずいと思った時にしっかりと衝動を抑えられる{userName}が皆から評価されています。',
        '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒されています。'
    ];
/*
*名前の文字列を渡すと診断結果を返す関数
*@param {string} userName ユーザーの名前
*@return {string} 診断結果
*
*このような方法でもコメントアウトできる。この場合は複数行のコメントにも対応している
*以下の関数の上に書かれているコメントは JSdoc と呼ばれている形式。このコメントの記述することで VScode 上でコードを入力する際に関数にどんな引数が必要か、
*どんな値が返ってくるか、ヒントが表示されるようになる。
*今回のコメントでは assessment 関数 には userName という引数で ユーザーの文字列で渡され、戻り値は「診断結果の文字列になることを記述している」
*/

function assessment(userName){
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfcharCode =0;
    for(let i=0; i < userName.length; i++){
        sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
    }
    //文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfcharCode % answers.length;
    let result = answers[index];
    result = result.replace(/{userName}/g,userName);

/* for文を使って名前の全てのコードを足し合わせている(一つずつ繰り返し処理している)
*　var という変数宣言の代わりに ES6 の let という変数宣言をしている。let で宣言した変数は for や if などの {} で囲まれた中での利用に限る事ができるので var よりも安全に使う事ができる
*　const では名前から計算した文字コードの合計値を、診断結果のパターンの数で割った「余り」を求め、それを利用して配列から診断結果を取得している。
*/

    //TODO {userName} ユーザーの名前に置き換える
    return result;
}
})();
