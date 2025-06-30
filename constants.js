const wikiUrl = "https://sweethomemaid.wikiru.jp/"
const atcUrl = wikiUrl + "attach2/"
const characterFilter = [
    { id: "irohaFilter", name: "彩葉", imgSrc: "assets/character_filter/iroha.jpg" },
    { id: "tsumugiFilter", name: "紬", imgSrc: "assets/character_filter/tsumugi.jpg" },
    { id: "nagiFilter", name: "凪", imgSrc: "assets/character_filter/nagi.jpg" },
    { id: "kanonFilter", name: "花音", imgSrc: "assets/character_filter/kanon.jpg" },
    { id: "scarletFilter", name: "スカーレット", imgSrc: "assets/character_filter/scarlet.jpg" },
    { id: "himarikoFilter", name: "ひまり子", imgSrc: "assets/character_filter/himariko.jpg" },
    { id: "niaFilter", name: "ニア", imgSrc: "assets/character_filter/nia.jpg" },
    { id: "nashwaFilter", name: "ナシュワ", imgSrc: "assets/character_filter/nashwa.jpg" },
    { id: "otherFilter", name: "その他", imgSrc: "assets/character_filter/other.jpg" },
];
const colorFilter = [
    { id: "redFilter", name: "赤", imgSrc: "assets/color_filter/red.jpg" },
    { id: "blueFilter", name: "青", imgSrc: "assets/color_filter/blue.jpg" },
    { id: "greenFilter", name: "緑", imgSrc: "assets/color_filter/green.jpg" },
    { id: "yellowFilter", name: "黄", imgSrc: "assets/color_filter/yellow.jpg" },
    { id: "aquaFilter", name: "水", imgSrc: "assets/color_filter/aqua.jpg" },
    { id: "violetFilter", name: "紫", imgSrc: "assets/color_filter/violet.jpg" }
];
const ctFilter = [
    { id: "ct1Filter", name: "1", imgSrc: "assets/ct_filter/ct1.png" },
    { id: "ct2Filter", name: "2", imgSrc: "assets/ct_filter/ct2.png" },
    { id: "ct3Filter", name: "3", imgSrc: "assets/ct_filter/ct3.png" },
    { id: "ct4Filter", name: "4", imgSrc: "assets/ct_filter/ct4.png" },
    { id: "ct5Filter", name: "5", imgSrc: "assets/ct_filter/ct5.png" },
    { id: "ct6Filter", name: "6", imgSrc: "assets/ct_filter/ct6.png" },
];
const rarityFilter = [
    { id: "rare1Filter", name: "1", imgSrc: "assets/rarity_filter/rare1.jpg" },
    { id: "rare2Filter", name: "2", imgSrc: "assets/rarity_filter/rare2.jpg" },
    { id: "rare3Filter", name: "3", imgSrc: "assets/rarity_filter/rare3.jpg" },
    { id: "rare4Filter", name: "4", imgSrc: "assets/rarity_filter/rare4.jpg" }
];
const colorSort = [
    { id: "redSort", name: "red", imgSrc: atcUrl+"696D67_70635F7265642E706E67.png" },
    { id: "blueSort", name: "blue", imgSrc: atcUrl+"696D67_70635F626C752E706E67.png" },
    { id: "greenSort", name: "green", imgSrc: atcUrl+"696D67_70635F67726E2E706E67.png" },
    { id: "yellowSort", name: "yellow", imgSrc: atcUrl+"696D67_70635F79656C2E706E67.png" },
    { id: "aquaSort", name: "aqua", imgSrc: atcUrl+"696D67_70635F6171612E706E67.png" },
    { id: "violetSort", name: "violet", imgSrc: atcUrl+"696D67_70635F76696F2E706E67.png" }
];
const killerFilter = [
    { id: "box", name: "ダンボールキラー", imgSrc: "assets/killer_filter/box.jpg" },
    { id: "peanuts", name: "ピーナッツキラー", imgSrc: "assets/killer_filter/peanuts.jpg" },
    { id: "mouse", name: "ネズミキラー", imgSrc: "assets/killer_filter/mouse.jpg" },
    { id: "tree", name: "薪キラー", imgSrc: "assets/killer_filter/tree.jpg" },
    { id: "chain", name: "鎖キラー", imgSrc: "assets/killer_filter/chain.jpg" },
    { id: "present", name: "プレゼント箱キラー", imgSrc: "assets/killer_filter/present.jpg" },
    { id: "jelly", name: "ゼリーキラー", imgSrc: "assets/killer_filter/jelly.jpg" },
    { id: "button", name: "ボタンキラー", imgSrc: "assets/killer_filter/button.jpg" },
    { id: "orange", name: "みかん箱キラー", imgSrc: "assets/killer_filter/orange.jpg" },
    { id: "spider", name: "蜘蛛の巣キラー", imgSrc: "assets/killer_filter/spider.jpg" },
    { id: "form", name: "泡キラー", imgSrc: "assets/killer_filter/form.jpg" },
    { id: "ice", name: "氷キラー", imgSrc: "assets/killer_filter/ice.jpg" },
    { id: "printer", name: "3Dプリンターキラー", imgSrc: "assets/killer_filter/printer.jpg" },
    { id: "egg", name: "たまごキラー", imgSrc: "assets/killer_filter/egg.jpg" },
    { id: "baloon", name: "風船キラー", imgSrc: "assets/killer_filter/baloon.jpg" },
    { id: "shell", name: "貝キラー", imgSrc: "assets/killer_filter/shell.jpg" },
    { id: "yoyo", name: "水ヨーヨーキラー", imgSrc: "assets/killer_filter/yoyo.jpg" },
    { id: "pretty", name: "プリティタン人形サポート", imgSrc: "assets/killer_filter/pretty.jpg" },
    { id: "cat", name: "箱入り猫なつき度", imgSrc: "assets/killer_filter/cat.jpg" },
    { id: "capsule", name: "ガチャカプセルキラー", imgSrc: "assets/killer_filter/capsule.jpg" },
    { id: "harb", name: "ハーブキラー", imgSrc: "assets/killer_filter/harb.jpg" },
];
const abilityFilter = [
    { id: "first", name: "初期スキルゲージ増加", imgSrc: atcUrl+"696D67_6162696C6974795F3237322E706E67.png" },
    { id: "linkage", name: "リンケージスキルコスト減少", imgSrc: atcUrl+"696D67_6162696C6974795F3237332E706E67.png" },
    { id: "diet", name: "ダイエットスキルコスト", imgSrc: atcUrl+"696D67_6162696C6974795F3237352E706E67.png" },
    { id: "rebound", name: "リバウンドスキルコスト", imgSrc: atcUrl+"696D67_6162696C6974795F3237342E706E67.png" },
    { id: "similar_up", name: "シミラー初期スキルゲージ増加", imgSrc: atcUrl+"696D67_6162696C6974795F3237372E706E67.png" },
    { id: "similar_down", name: "シミラースキルコスト減少", imgSrc: atcUrl+"696D67_6162696C6974795F3237362E706E67.png" },
    { id: "pair_up", name: "ペアルック初期スキルゲージ増加", imgSrc: atcUrl+"696D67_6162696C6974795F3237392E706E67.png" },
    { id: "pair_down", name: "ペアルックスキルコスト減少", imgSrc: atcUrl+"696D67_6162696C6974795F3237382E706E67.png" },
    { id: "repeat_share", name: "リピートシェアスキルコスト", imgSrc: atcUrl+"696D67_6162696C6974795F3330352E706E67.png" },
    { id: "use_cost_up", name: "他カードスキル使用時スキルゲージ増加", imgSrc: atcUrl+"696D67_6162696C6974795F3330312E706E67.png" },
    { id: "use_ct_down", name: "他カードスキル使用時スキルクールタイム減少", imgSrc: atcUrl+"696D67_6162696C6974795F3330332E706E67.png" },
    { id: "quick_ct_hand2", name: "クイッククールタイム減少/手数アップ", imgSrc: atcUrl+"696D67_6162696C6974795F3330342E706E67.png" },
    { id: "hand1", name: "手数1アップ", imgSrc: atcUrl+"696D67_6162696C6974795F3239302E706E67.png" },
    { id: "hand2", name: "手数2アップ", imgSrc: atcUrl+"696D67_6162696C6974795F3239612E706E67.png" },
    { id: "wave1", name: "Wave手数回復+1", imgSrc: atcUrl+"696D67_6162696C6974795F3239312E706E67.png" },
    { id: "wave2", name: "Wave手数回復+2", imgSrc: atcUrl+"696D67_6162696C6974795F3239622E706E67.png" },
    { id: "penetration", name: "貫通ロケット", imgSrc: "assets/penetration.png" },
    { id: "ac_all", name: "アクセントカラー", imgSrc: atcUrl+"696D67_6162696C6974795F4143616C6C38302E706E67.png" },
    { id: "score_all", name: "リンケージオールスコアアップ", imgSrc: atcUrl+"696D67_6162696C6974795F3236332E706E67.png" },
];
const skillTypeFilter = [
  { id: "create", name: "クリエイト", imgSrc: "assets/create.png" },
  { id: "fast", name: "ファスト", imgSrc: "assets/fast.png" },
  { id: "select", name: "セレクト", imgSrc: "assets/select.png" },
  { id: "p_change", name: "ピースチェンジ", imgSrc: atcUrl+"696D67_736B5F706368616E67652E706E67.png" },
  { id: "rp_change", name: "遠隔ピースチェンジ", imgSrc: atcUrl+"696D67_736B696C6C5F3033372E706E67.png" },
  { id: "break", name: "ピースブレイク", imgSrc: atcUrl+"696D67_736B696C6C5F3032392E706E67.png" },
  { id: "change", name: "カラーチェンジ", imgSrc: atcUrl+"696D67_736B5F43432E706E67.png" },
  { id: "shuffle", name: "ピースシャッフル", imgSrc: atcUrl+"696D67_736B5F7073687566666C652E706E67.png" },
  { id: "gage_up", name: "スキルゲージアップ", imgSrc: atcUrl+"696D67_736B696C6C5F3033302E706E67.png" },
  { id: "ct_cool_down", name: "スキルクールダウン1", imgSrc: atcUrl+"696D67_736B5F43442E706E67.png" },
];
const boosterFilter = [
  { id: "special", name: "スペシャル", imgSrc: atcUrl+"696D67_625F7370652E706E67.png" },
  { id: "bom", name: "ボム", imgSrc: atcUrl+"696D67_625F626F6D2E706E67.png" },
  { id: "rocket", name: "ロケット", imgSrc: atcUrl+"696D67_625F726B562E706E67.png" },
  { id: "missile", name: "ミサイル", imgSrc: atcUrl+"696D67_625F6D736C2E706E67.png" },
  { id: "mix", name: "ミックス", imgSrc: "assets/mix.png" },
];
const plusFilter = [
  { id: "booster1", name: "+1", imgSrc: "assets/plus_filter/plus1.jpg" },
  { id: "booster2", name: "+2", imgSrc: "assets/plus_filter/plus2.jpg" },
  { id: "bom1", name: "ボム+1", imgSrc: "assets/plus_filter/bom_plus1.jpg" },
  { id: "bom2", name: "ボム+2", imgSrc: "assets/plus_filter/bom_plus2.jpg" },
  { id: "msl1", name: "ミサイル+1", imgSrc: "assets/plus_filter/msl_plus1.jpg" },
  { id: "msl2", name: "ミサイル+2", imgSrc: "assets/plus_filter/msl_plus2.jpg" },
  { id: "rocket1", name: "ロケット+1", imgSrc: "assets/plus_filter/rocket_plus1.jpg" },
  { id: "rocket2", name: "ロケット+2", imgSrc: "assets/plus_filter/rocket_plus2.jpg" },
];
const colorMap = {
  "赤": "696D67_70635F7265642E706E67.png",
  "青": "696D67_70635F626C752E706E67.png",
  "緑": "696D67_70635F67726E2E706E67.png",
  "黄": "696D67_70635F79656C2E706E67.png",
  "水": "696D67_70635F6171612E706E67.png",
  "紫": "696D67_70635F76696F2E706E67.png"
};

