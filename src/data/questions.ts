// MBTI의 8가지 성향 글자 타입
export type MbtiTrait = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

// MBTI의 4가지 지표(에너지, 인식, 판단, 생활) 타입
export type MbtiDimension = "EI" | "SN" | "TF" | "JP";

// 각 선택지가 가지는 텍스트와 성향 값 타입
export interface QuestionOption {
  label: string;
  trait: MbtiTrait;
}

// 검사 문항 1개의 구조 타입
export interface Question {
  id: number;
  dimension: MbtiDimension;
  prompt: string;
  options: [QuestionOption, QuestionOption];
}

// 12개 검사 문항 목록 (같은 지표가 연달아 나오지 않도록 순서를 섞어 배치)
export const QUESTIONS: Question[] = [
  {
    id: 1,
    dimension: "EI",
    prompt: "모처럼 생긴 주말 오후, 가장 먼저 떠오르는 생각은 무엇인가요?",
    options: [
      { label: "밖에 나가서 친구들을 만나 수다 떨고 싶어요.", trait: "E" },
      { label: "집에서 좋아하는 간식을 먹으며 혼자 쉬고 싶어요.", trait: "I" },
    ],
  },
  {
    id: 2,
    dimension: "SN",
    prompt: "동네에 새로 생긴 카페에 들어섰을 때 가장 먼저 눈에 들어오는 것은 무엇인가요?",
    options: [
      { label: "메뉴판 가격과 인기 음료, 좌석이 편한지 살펴봐요.", trait: "S" },
      { label: "카페 전체의 분위기와 이곳만의 독특한 콘셉트를 느껴요.", trait: "N" },
    ],
  },
  {
    id: 3,
    dimension: "TF",
    prompt: "친구가 속상한 일을 털어놓으며 고민을 말할 때 나는 어떤 편인가요?",
    options: [
      { label: "상황을 차근차근 정리해 현실적인 해결 방법을 찾아줘요.", trait: "T" },
      { label: "먼저 친구의 마음을 꼭 안아주듯 공감하며 위로해 줘요.", trait: "F" },
    ],
  },
  {
    id: 4,
    dimension: "JP",
    prompt: "설레는 여행을 일주일 앞두고 있을 때 나의 모습은 어떤가요?",
    options: [
      { label: "갈 곳과 맛집, 이동 시간을 미리 꼼꼼하게 적어 둬요.", trait: "J" },
      { label: "가고 싶은 곳 몇 군데만 정해 두고 발길 닿는 대로 가요.", trait: "P" },
    ],
  },
  {
    id: 5,
    dimension: "EI",
    prompt: "처음 가 본 모임에서 어색한 분위기가 흐를 때 어떻게 하시나요?",
    options: [
      { label: "먼저 말을 걸어 분위기를 부드럽게 풀어요.", trait: "E" },
      { label: "누가 말을 걸어줄 때까지 조용히 미소 지으며 기다려요.", trait: "I" },
    ],
  },
  {
    id: 6,
    dimension: "SN",
    prompt: "학교나 회사에서 새로운 과제나 업무를 맡게 되었을 때 가장 먼저 하는 일은 무엇인가요?",
    options: [
      { label: "예전 자료와 구체적인 진행 순서부터 꼼꼼히 확인해요.", trait: "S" },
      { label: "전체적인 그림과 새로운 아이디어를 먼저 떠올려 봐요.", trait: "N" },
    ],
  },
  {
    id: 7,
    dimension: "TF",
    prompt: "팀 프로젝트에서 의견이 다를 때 가장 중요하게 생각하는 것은 무엇인가요?",
    options: [
      { label: "어느 쪽이 더 논리적이고 효율적인지 따져 보는 거예요.", trait: "T" },
      { label: "모두가 서운하지 않고 기분 좋게 함께할 수 있는지예요.", trait: "F" },
    ],
  },
  {
    id: 8,
    dimension: "JP",
    prompt: "책상 위 물건을 정리할 때 나는 어떤 스타일인가요?",
    options: [
      { label: "자주 쓰는 물건마다 제자리를 정해 두고 깔끔히 맞춰 둬요.", trait: "J" },
      { label: "내 손에 닿기 편한 곳에 두는 편이고 조금 흩어져도 괜찮아요.", trait: "P" },
    ],
  },
  {
    id: 9,
    dimension: "EI",
    prompt: "하루 종일 바쁘게 지낸 뒤 에너지를 채우는 나만의 방법은 무엇인가요?",
    options: [
      { label: "친한 사람과 통화하거나 만나서 오늘 일을 이야기해요.", trait: "E" },
      { label: "아무도 방해하지 않는 조용한 공간에서 나만의 시간을 보내요.", trait: "I" },
    ],
  },
  {
    id: 10,
    dimension: "SN",
    prompt: "멍하니 창밖을 바라볼 때 주로 어떤 생각을 하시나요?",
    options: [
      { label: "오늘 할 일이나 저녁에 먹을 메뉴처럼 현실적인 생각을 해요.", trait: "S" },
      { label: "만약에 내가 다른 세상에서 산다면 어떨지 상상을 펼쳐요.", trait: "N" },
    ],
  },
  {
    id: 11,
    dimension: "TF",
    prompt: "영화를 보고 난 뒤 가장 오래 기억에 남는 부분은 무엇인가요?",
    options: [
      { label: "이야기의 앞뒤 흐름이 자연스럽고 짜임새가 있었는지예요.", trait: "T" },
      { label: "등장인물의 감정선과 마음이 움직였던 명장면이에요.", trait: "F" },
    ],
  },
  {
    id: 12,
    dimension: "JP",
    prompt: "오늘 안에 끝내야 하는 할 일이 생겼을 때 어떻게 움직이시나요?",
    options: [
      { label: "우선순위를 정해 미루지 않고 계획대로 차근차근 끝내요.", trait: "J" },
      { label: "집중이 잘 되는 순간에 몰입해서 한 번에 쭉 해치워요.", trait: "P" },
    ],
  },
];
