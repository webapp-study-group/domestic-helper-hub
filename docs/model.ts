export type DomesticHelper = {
  gender: 'Female' | null
  has_come_hk: boolean | null
  has_kid: boolean | null
  nationality: 'Indonesian' | 'Philippines' | null
  religion: 'Muslim' | 'Christian' | 'Catholic' | null
  marital: 'Single' | 'Married' | 'Divorced' | null
  age: number | null
  cook: boolean | null // detect from exp / comment
  lang_english: boolean | null
  lang_cantonese: boolean | null
  lang_mandarin: boolean | null
  smoke: boolean | null
  drink: boolean | null
  zodiac_sign: string | null // 星座
  chinese_zodiac: string | null // 生肖
  height: number | null
  weight: number | null
  name: string | null
  education_level: string | null
  source_url: string // url
}

export type Company = {
  name: string
  main_page: string
  tel: string | null
  email: string | null
}

export type WorkExperience = {
  has_baby: boolean | null
  has_child: boolean | null
  has_elderly: boolean | null
  start_year: number | null
  end_year: number | null
}
