export interface FormData {
  // Section 1: Client Identification
  SK_ID_CURR: number | null;
  SK_ID_PREV: number | null;
  community_id: number | null;

  // Section 2: Personal Information
  CODE_GENDER: string;
  FLAG_OWN_CAR: boolean;
  FLAG_OWN_REALTY: boolean;
  CNT_CHILDREN: number;
  CNT_FAM_MEMBERS: number;
  NAME_EDUCATION_TYPE: string;
  NAME_FAMILY_STATUS: string;
  NAME_HOUSING_TYPE: string;
  OCCUPATION_TYPE: string;
  ORGANIZATION_TYPE: string;

  // Section 3: Income & Financial Capacity
  AMT_INCOME_TOTAL: number | null;
  NAME_INCOME_TYPE: string;
  AMT_CREDIT_x: number | null;
  AMT_ANNUITY_x: number | null;
  AMT_GOODS_PRICE_x: number | null;
  AMT_ANNUITY_x_missing: boolean;
  AMT_GOODS_PRICE_x_missing: boolean;

  // Section 4: Age & Employment History
  DAYS_BIRTH: number | null;
  DAYS_EMPLOYED: number | null;
  DAYS_REGISTRATION: number | null;
  DAYS_ID_PUBLISH: number | null;
  DAYS_LAST_PHONE_CHANGE: number | null;

  // Section 5: Contact Information
  FLAG_MOBIL: boolean;
  FLAG_EMP_PHONE: boolean;
  FLAG_WORK_PHONE: boolean;
  FLAG_CONT_MOBILE: boolean;
  FLAG_PHONE: boolean;
  FLAG_EMAIL: boolean;

  // Section 6: Regional & Location Data
  REGION_POPULATION_RELATIVE: boolean;
  REGION_RATING_CLIENT: number;
  REGION_RATING_CLIENT_W_CITY: number;
  REG_REGION_NOT_LIVE_REGION: boolean;
  REG_REGION_NOT_WORK_REGION: boolean;
  LIVE_REGION_NOT_WORK_REGION: boolean;
  REG_CITY_NOT_LIVE_CITY: boolean;
  REG_CITY_NOT_WORK_CITY: boolean;
  LIVE_CITY_NOT_WORK_CITY: boolean;
  URBAN_RURAL: boolean;
  CITY_REGION_MISMATCH_SCORE: number;

  // Section 7: Current Application Details
  NAME_CONTRACT_TYPE_x: string;
  NAME_TYPE_SUITE_x: string;
  WEEKDAY_APPR_PROCESS_START_x: string;
  HOUR_APPR_PROCESS_START_x: number;

  // Section 8: External Data Sources
  EXT_SOURCE_2: number | null;
  EXT_SOURCE_3: number | null;
  EXT_SOURCE_2_missing: boolean;
  EXT_SOURCE_3_missing: boolean;

  // Section 9: Social Circle & Credit Bureau
  OBS_30_CNT_SOCIAL_CIRCLE: number;
  DEF_30_CNT_SOCIAL_CIRCLE: number;
  OBS_60_CNT_SOCIAL_CIRCLE: number;
  DEF_60_CNT_SOCIAL_CIRCLE: number;
  OBS_30_missing: boolean;
  DEF_30_missing: boolean;
  OBS_60_missing: boolean;
  DEF_60_missing: boolean;
  AMT_REQ_CREDIT_BUREAU_HOUR: number;
  AMT_REQ_CREDIT_BUREAU_DAY: number;
  AMT_REQ_CREDIT_BUREAU_WEEK: number;
  AMT_REQ_CREDIT_BUREAU_MON: number;
  AMT_REQ_CREDIT_BUREAU_QRT: number;
  AMT_REQ_CREDIT_BUREAU_YEAR: number;
  BUREAU_HOUR_missing: boolean;
  BUREAU_DAY_missing: boolean;
  BUREAU_WEEK_missing: boolean;
  BUREAU_MON_missing: boolean;
  BUREAU_QRT_missing: boolean;
  BUREAU_YEAR_missing: boolean;

  // Section 10: Documents Provided
  FLAG_DOCUMENT_2: boolean;
  FLAG_DOCUMENT_3: boolean;
  FLAG_DOCUMENT_4: boolean;
  FLAG_DOCUMENT_5: boolean;
  FLAG_DOCUMENT_6: boolean;
  FLAG_DOCUMENT_7: boolean;
  FLAG_DOCUMENT_8: boolean;
  FLAG_DOCUMENT_9: boolean;
  FLAG_DOCUMENT_10: boolean;
  FLAG_DOCUMENT_11: boolean;
  FLAG_DOCUMENT_12: boolean;
  FLAG_DOCUMENT_13: boolean;
  FLAG_DOCUMENT_14: boolean;
  FLAG_DOCUMENT_15: boolean;
  FLAG_DOCUMENT_16: boolean;
  FLAG_DOCUMENT_17: boolean;
  FLAG_DOCUMENT_18: boolean;
  FLAG_DOCUMENT_19: boolean;
  FLAG_DOCUMENT_20: boolean;
  FLAG_DOCUMENT_21: boolean;

  // Section 11: Previous Application Details
  NAME_CONTRACT_TYPE_y: string;
  AMT_ANNUITY_y: number | null;
  AMT_APPLICATION: number | null;
  AMT_CREDIT_y: number | null;
  AMT_GOODS_PRICE_y: number | null;
  WEEKDAY_APPR_PROCESS_START_y: string;
  HOUR_APPR_PROCESS_START_y: number;
  FLAG_LAST_APPL_PER_CONTRACT: boolean;
  NFLAG_LAST_APPL_IN_DAY: boolean;
  NAME_CASH_LOAN_PURPOSE: string;
  NAME_CONTRACT_STATUS: string;
  DAYS_DECISION: number | null;
  NAME_PAYMENT_TYPE: string;
  CODE_REJECT_REASON: string;
  NAME_CLIENT_TYPE: string;
  NAME_GOODS_CATEGORY: string;
  NAME_PORTFOLIO: string;
  NAME_PRODUCT_TYPE: string;
  CHANNEL_TYPE: string;
  SELLERPLACE_AREA: number | null;
  NAME_SELLER_INDUSTRY: string;
  CNT_PAYMENT: number | null;
  NAME_YIELD_GROUP: string;
  PRODUCT_COMBINATION: string;
  NFLAG_INSURED_ON_APPROVAL: boolean;
  DAYS_FIRST_DRAWING: number | null;
  DAYS_FIRST_DUE: number | null;
  DAYS_LAST_DUE_1ST_VERSION: number | null;
  DAYS_LAST_DUE: number | null;
  DAYS_TERMINATION: number | null;
  AMT_GOODS_PRICE_y_missing: boolean;
  CNT_PAYMENT_missing: boolean;
  AMT_ANNUITY_y_missing: boolean;
  NFLAG_INSURED_ON_APPROVAL_missing: boolean;
  DAYS_FIRST_DRAWING_missing: boolean;
  DAYS_FIRST_DUE_missing: boolean;
  DAYS_LAST_DUE_1ST_VERSION_missing: boolean;
  DAYS_LAST_DUE_missing: boolean;
  DAYS_TERMINATION_missing: boolean;
}

export const defaultFormData: FormData = {
  // Section 1
  SK_ID_CURR: null,
  SK_ID_PREV: null,
  community_id: null,

  // Section 2
  CODE_GENDER: "",
  FLAG_OWN_CAR: false,
  FLAG_OWN_REALTY: false,
  CNT_CHILDREN: 0,
  CNT_FAM_MEMBERS: 1,
  NAME_EDUCATION_TYPE: "",
  NAME_FAMILY_STATUS: "",
  NAME_HOUSING_TYPE: "",
  OCCUPATION_TYPE: "",
  ORGANIZATION_TYPE: "",

  // Section 3
  AMT_INCOME_TOTAL: null,
  NAME_INCOME_TYPE: "",
  AMT_CREDIT_x: null,
  AMT_ANNUITY_x: null,
  AMT_GOODS_PRICE_x: null,
  AMT_ANNUITY_x_missing: false,
  AMT_GOODS_PRICE_x_missing: false,

  // Section 4
  DAYS_BIRTH: null,
  DAYS_EMPLOYED: null,
  DAYS_REGISTRATION: null,
  DAYS_ID_PUBLISH: null,
  DAYS_LAST_PHONE_CHANGE: null,

  // Section 5
  FLAG_MOBIL: true,
  FLAG_EMP_PHONE: false,
  FLAG_WORK_PHONE: false,
  FLAG_CONT_MOBILE: false,
  FLAG_PHONE: false,
  FLAG_EMAIL: false,

  // Section 6
  REGION_POPULATION_RELATIVE: false,
  REGION_RATING_CLIENT: 1,
  REGION_RATING_CLIENT_W_CITY: 1,
  REG_REGION_NOT_LIVE_REGION: false,
  REG_REGION_NOT_WORK_REGION: false,
  LIVE_REGION_NOT_WORK_REGION: false,
  REG_CITY_NOT_LIVE_CITY: false,
  REG_CITY_NOT_WORK_CITY: false,
  LIVE_CITY_NOT_WORK_CITY: false,
  URBAN_RURAL: false,
  CITY_REGION_MISMATCH_SCORE: 0,

  // Section 7
  NAME_CONTRACT_TYPE_x: "",
  NAME_TYPE_SUITE_x: "",
  WEEKDAY_APPR_PROCESS_START_x: "",
  HOUR_APPR_PROCESS_START_x: 0,

  // Section 8
  EXT_SOURCE_2: null,
  EXT_SOURCE_3: null,
  EXT_SOURCE_2_missing: false,
  EXT_SOURCE_3_missing: false,

  // Section 9
  OBS_30_CNT_SOCIAL_CIRCLE: 0,
  DEF_30_CNT_SOCIAL_CIRCLE: 0,
  OBS_60_CNT_SOCIAL_CIRCLE: 0,
  DEF_60_CNT_SOCIAL_CIRCLE: 0,
  OBS_30_missing: false,
  DEF_30_missing: false,
  OBS_60_missing: false,
  DEF_60_missing: false,
  AMT_REQ_CREDIT_BUREAU_HOUR: 0,
  AMT_REQ_CREDIT_BUREAU_DAY: 0,
  AMT_REQ_CREDIT_BUREAU_WEEK: 0,
  AMT_REQ_CREDIT_BUREAU_MON: 0,
  AMT_REQ_CREDIT_BUREAU_QRT: 0,
  AMT_REQ_CREDIT_BUREAU_YEAR: 0,
  BUREAU_HOUR_missing: false,
  BUREAU_DAY_missing: false,
  BUREAU_WEEK_missing: false,
  BUREAU_MON_missing: false,
  BUREAU_QRT_missing: false,
  BUREAU_YEAR_missing: false,

  // Section 10
  FLAG_DOCUMENT_2: false,
  FLAG_DOCUMENT_3: false,
  FLAG_DOCUMENT_4: false,
  FLAG_DOCUMENT_5: false,
  FLAG_DOCUMENT_6: false,
  FLAG_DOCUMENT_7: false,
  FLAG_DOCUMENT_8: false,
  FLAG_DOCUMENT_9: false,
  FLAG_DOCUMENT_10: false,
  FLAG_DOCUMENT_11: false,
  FLAG_DOCUMENT_12: false,
  FLAG_DOCUMENT_13: false,
  FLAG_DOCUMENT_14: false,
  FLAG_DOCUMENT_15: false,
  FLAG_DOCUMENT_16: false,
  FLAG_DOCUMENT_17: false,
  FLAG_DOCUMENT_18: false,
  FLAG_DOCUMENT_19: false,
  FLAG_DOCUMENT_20: false,
  FLAG_DOCUMENT_21: false,

  // Section 11
  NAME_CONTRACT_TYPE_y: "",
  AMT_ANNUITY_y: null,
  AMT_APPLICATION: null,
  AMT_CREDIT_y: null,
  AMT_GOODS_PRICE_y: null,
  WEEKDAY_APPR_PROCESS_START_y: "",
  HOUR_APPR_PROCESS_START_y: 0,
  FLAG_LAST_APPL_PER_CONTRACT: false,
  NFLAG_LAST_APPL_IN_DAY: false,
  NAME_CASH_LOAN_PURPOSE: "",
  NAME_CONTRACT_STATUS: "",
  DAYS_DECISION: null,
  NAME_PAYMENT_TYPE: "",
  CODE_REJECT_REASON: "",
  NAME_CLIENT_TYPE: "",
  NAME_GOODS_CATEGORY: "",
  NAME_PORTFOLIO: "",
  NAME_PRODUCT_TYPE: "",
  CHANNEL_TYPE: "",
  SELLERPLACE_AREA: null,
  NAME_SELLER_INDUSTRY: "",
  CNT_PAYMENT: null,
  NAME_YIELD_GROUP: "",
  PRODUCT_COMBINATION: "",
  NFLAG_INSURED_ON_APPROVAL: false,
  DAYS_FIRST_DRAWING: null,
  DAYS_FIRST_DUE: null,
  DAYS_LAST_DUE_1ST_VERSION: null,
  DAYS_LAST_DUE: null,
  DAYS_TERMINATION: null,
  AMT_GOODS_PRICE_y_missing: false,
  CNT_PAYMENT_missing: false,
  AMT_ANNUITY_y_missing: false,
  NFLAG_INSURED_ON_APPROVAL_missing: false,
  DAYS_FIRST_DRAWING_missing: false,
  DAYS_FIRST_DUE_missing: false,
  DAYS_LAST_DUE_1ST_VERSION_missing: false,
  DAYS_LAST_DUE_missing: false,
  DAYS_TERMINATION_missing: false,
};
