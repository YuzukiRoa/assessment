'use strict';

const userNameInput= document.getElementById('user-name');          //idを指定するときのテンプレ
const assessmentButton= document.getElementById('assessment');　　　//と考えておけば良さそう
const resultDivided= document.getElementById('result-area');　　　　//使いやすくまとめた
const tweetDivided= document.getElementById('tweet-area');          //

/**
 * 指定した要素の子を全て削除する
 * @param{HTMLElement} element HTMLの要素
 */
function removeALLChildren(element){
    while(element.firstChild){//子要素がある限り削除
    element.removeChild(element.firstChild);}
}


assessmentButton.onclick= function(){                    //onclick というプロパティ
    const userName= userNameInput.value;　　　　　　　　　 //value プロパティで Textエリアに入力された文字列を受け取れる
    if (userName.length===0){  //名前が空の時は処理を終了する
        return;
    }
    console.log(userName);


    //TODO　診断結果表示エリアの作成
    removeALLChildren(resultDivided);  //子要素を削除する関数

    const header= document.createElement('h3');　      　//子要素の作成(div)
    header.innerText= '診断結果';
    resultDivided.appendChild(header);

    const paragraph= document.createElement('p');　　    //子要素の作成(div)
    const result = assessment(userName);
    paragraph.innerText= result;
    resultDivided.appendChild(paragraph);                //親要素に追加(paragraph > resuliarea(div))

    //TODO　ツイートエリアの作成
    removeALLChildren(tweetDivided);

    const anchor = document.createElement('a');          //aタグの作成(div)、anchorオブジェクト作成
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
        + encodeURIComponent('てめぇの推しライバー') 
        + '&ref_src=twsrc%5Etfw';                        //href属性の定数の定義

    anchor.setAttribute('href',hrefValue);               //href属性(anchorタグ)追加
    anchor.className = 'twitter-hashtag-button';         //class属性(anchorタグ)  ボタンをCSSで変える
    anchor.setAttribute('data-text',result);             //data-text属性(anchorタグ)追加
    anchor.innerText = 'Tweet #てめぇの推しライバー';      //aタグのテキスト
    tweetDivided.appendChild(anchor);                    //親要素に追加(anchor > tweetarea(div))


    //widgets.js の設定
    const script = document.createElement('script');     //scriptタグの作成(div)
    script.setAttribute('src','https://platform.twitter.com/widgets.js');　//src属性(scriptタグ)
    tweetDivided.appendChild(script);                    //親要素に追加(script > tweetarea(div))
}

const answers = [
    '{user Name}の推しになるライバーは御伽原江良でち。',
    '{user Name}の推しになるライバーは夢月ロアでよ。',
    '{user Name}の推しになるライバーは椎名唯華です。',
    '{user Name}の推しになるライバーは笹木咲やよ～。',
    '{user Name}の推しになるライバーは童田明治です。',
    '{user Name}の推しになるライバーはヘルエスタ皇国第二皇女リゼ・ヘルエスタです。',
    '{user Name}の推しになるライバーは戌井とこです。',
    '{user Name}の推しになるライバーは森中花咲です。',
    '{user Name}の推しになるライバーは鈴原るるです。',
    '{user Name}の推しになるライバーは郡道美玲です。',
    '{user Name}の推しになるライバーは白銀ノエル(ホロライブ）です。',
    '{user Name}の推しになるライバーは星川サラです。',
    '{user Name}の推しになるライバーは本間ひまわりです。'
    '{user Name}の推しになるライバーはまだ存在しません。'
];

 /**
  * 名前の文字列を渡すと診断結果を返す関数
  * @param {string} userName ユーザーの名前
  * @return {string} 診断結果
  */


 function assessment(userName){
    //全文字のコード番号を取得して足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0 ; i<userName.length ; i++){
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って適当な数値を出す
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    //正規表現を用いて名前を代入
        result = result.replace(/\{user Name\}/g,userName);
    return result;
 }


 //関数が正しく動いているかのテスト
 console.assert(
     assessment('kokyuutosu') === 'kokyuutosuの推しになるライバーは鈴原るるです。',
     'YOU HAVE MISTAKES'
 );

 //同一のuserNameのとき同一の結果が出力されているかのテスト
 console.assert(
     assessment('kokyuutosu') === assessment('kokyuutosu'),
     '同一のuserNameのとき同一の結果が出力されていない'
 );




