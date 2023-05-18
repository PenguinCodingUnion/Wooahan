import React from "react";
import { connect } from "react-redux";

export const OpenSourceLicenses = (props) => {
  return (
    <div className="bg-mainWhite mx-auto my-2 w-[95%] h-full overflow-scroll p-2 text-left">
      <h3 className="text-lg font-MaplestoryBold">Sound</h3>
      <hr />

      <h4 className="mt-1 text-sm font-MaplestoryBold">
        Laught_Sparrow school_Woodwind Strings_T120 _5.1
      </h4>
      <p className="text-xs font-MaplestoryLight">
        본 저작물은 "전주정보문화산업진흥원"에서 2021년 작성하여 공공누리
        제1유형으로 개방한 "웃긴_참새학교_목관악기_현악기_T120"을 이용하였으며,
        해당 저작물은 "전주정보문화산업진흥원",
        https://www.kogl.or.kr/recommend/recommendDivView.do?recommendIdx=40500&division=audio에서
        무료로 다운받으실 수 있습니다.
      </p>

      <h4 className="mt-1 text-sm font-MaplestoryBold">
        Lively_Garden party_Electronic piano Electronic Drum_T108_5.1
      </h4>
      <p className="text-xs font-MaplestoryLight">
        본 저작물은 "전주정보문화산업진흥원"에서 2021년 작성하여 공공누리
        제1유형으로 개방한 "발랄한_가든파티_전자피아노_전자드럼_T108"을
        이용하였으며, 해당 저작물은 "전주정보문화산업진흥원",
        https://www.kogl.or.kr/recommend/recommendDivView.do?recommendIdx=40511&division=audio에서
        무료로 다운받으실 수 있습니다.
      </p>

      <h4 className="mt-1 text-sm font-MaplestoryBold">Did you know</h4>
      <p className="text-xs font-MaplestoryLight">
        본 저작물은 "한국저작권위원회"에서 작성하여 1 차 저작물으로 개방한 "Did
        you know" (작성자:김재성)을 이용하였으며, 해당 저작물은
        "한국저작권위원회",
        https://gongu.copyright.or.kr/gongu/wrt/wrt/view.do?wrtSn=13073727&menuNo=200020
        에서 무료로 다운받으실 수 있습니다.
      </p>

      <h4 className="mt-1 text-sm font-MaplestoryBold">Walking</h4>
      <p className="text-xs font-MaplestoryLight">
        본 저작물은 "한국저작권위원회"에서 작성하여 1 차 저작물으로 개방한
        "Walking" (작성자:김현정)을 이용하였으며, 해당 저작물은
        "한국저작권위원회",
        https://gongu.copyright.or.kr/gongu/wrt/wrt/view.do?wrtSn=13073799&menuNo=200020
        에서 무료로 다운받으실 수 있습니다.
      </p>

      <h4 className="mt-1 text-sm font-MaplestoryBold">아침(Morning)</h4>
      <p className="text-xs font-MaplestoryLight">
        본 저작물은 "한국저작권위원회"에서 작성하여 1 차 저작물으로 개방한
        "아침(Morning)" (작성자:계한용, 구재영)을 이용하였으며, 해당 저작물은
        "한국저작권위원회",
        https://gongu.copyright.or.kr/gongu/wrt/wrt/view.do?wrtSn=13048724&menuNo=200020
        에서 무료로 다운받으실 수 있습니다.
      </p>

      <h4 className="mt-1 text-sm font-MaplestoryBold">
        Hopefulness_Sea turtle_Ukulele Piano Percussion_T90_5.1
      </h4>
      <p className="text-xs font-MaplestoryLight">
        본 저작물은 "전주정보문화산업진흥원"에서 2021년 작성하여 공공누리
        제1유형으로 개방한 "희망찬_바다거북이_우쿠렐레_피아노_퍼커션_T90"을
        이용하였으며, 해당 저작물은 "전주정보문화산업진흥원",
        https://www.kogl.or.kr/recommend/recommendDivView.do?recommendIdx=40595&division=audio에서
        무료로 다운받으실 수 있습니다.
      </p>

      <h4 className="mt-1 text-sm font-MaplestoryBold">
        Lively_Baby robot_Electronic piano_Synthesizer_Drum_T102_5.1
      </h4>
      <p className="text-xs font-MaplestoryLight">
        본 저작물은 "전주정보문화산업진흥원"에서 2121년 작성하여 공공누리
        제1유형으로 개방한 "발랄한_아기로봇_전자피아노_신디사이저_드럼_T102"을
        이용하였으며, 해당 저작물은 "전주정보문화산업진흥원",
        https://www.kogl.or.kr/recommend/recommendDivView.do?recommendIdx=40555&division=audio에서
        무료로 다운받으실 수 있습니다.
      </p>
      <br />
      <h3 className="text-lg font-MaplestoryBold">Font</h3>
      <hr />
      <h4 className="mt-1 text-sm font-MaplestoryBold">넥슨 메이플스토리</h4>
      <p className="text-xs font-MaplestoryLight">
        본 저작물은 넥슨에서 작성하여 개방한 "넥슨 메이플스토리"을 이용하였으며,
        해당 저작물은 넥슨, http://levelup.nexon.com/font/index.aspx?page=5에서
        무료로 다운받으실 수 있습니다.
      </p>
      <h4 className="mt-1 text-sm font-MaplestoryBold">넷마블체</h4>
      <p className="text-xs font-MaplestoryLight">
        본 저작물은 넷마블에서 작성하여 개방한 "넷마블체"을 이용하였으며, 해당
        저작물은 넷마블, http://company.netmarble.com/company/ci?tab=2에서
        무료로 다운받으실 수 있습니다.
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OpenSourceLicenses);
