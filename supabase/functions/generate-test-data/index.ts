import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    console.log('Starting test data generation...');

    // Fetch random sample rows
    const { data: sampleData, error: fetchError } = await supabaseClient
      .from('loan_staging')
      .select('*')
      .limit(100);

    if (fetchError) {
      console.error('Error fetching sample data:', fetchError);
      throw new Error(`Failed to fetch sample data: ${fetchError.message}`);
    }

    if (!sampleData || sampleData.length === 0) {
      throw new Error('No sample data available in loan_staging table');
    }

    const randomSample = sampleData[Math.floor(Math.random() * sampleData.length)];
    console.log('Selected random sample SK_ID_CURR:', randomSample.sk_id_curr);

    const generatedData = generateVariations(randomSample);

    const { data: insertedData, error: insertError } = await supabaseClient
      .from('loan_staging')
      .insert([generatedData])
      .select('sk_id_curr, id')
      .single();

    if (insertError) {
      console.error('Error inserting generated data:', insertError);
      throw new Error(`Failed to insert data: ${insertError.message}`);
    }

    console.log('Successfully generated data with SK_ID_CURR:', insertedData.sk_id_curr);
    console.log('Database trigger will automatically update risk score for record:', insertedData.id);

    return new Response(
      JSON.stringify({
        success: true,
        sk_id_curr: insertedData.sk_id_curr,
        id: insertedData.id,
        message: 'Test data generated successfully. Risk score will be updated automatically by database trigger.',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in generate-test-data function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

function generateVariations(sample: any): any {
  const newSkIdCurr = Date.now() + Math.floor(Math.random() * 100000);
  const newSkIdPrev = Date.now() + Math.floor(Math.random() * 100000) + 1000000;
  
  const generated = { ...sample };
  
  delete generated.id;
  delete generated.created_at;
  delete generated.updated_at;
  delete generated.user_id;
  delete generated.risk_score;
  delete generated.pdf_path;
  
  generated.sk_id_curr = newSkIdCurr;
  generated.sk_id_prev = newSkIdPrev;
  generated.community_id = sample.community_id ? 
    sample.community_id + Math.floor(Math.random() * 200 - 100) : 
    Math.floor(Math.random() * 200000);
  
  generated.code_gender = randomChoice([sample.code_gender, flipGender(sample.code_gender)], [0.7, 0.3]);
  generated.flag_own_car = randomFlip(sample.flag_own_car, 0.3);
  generated.flag_own_realty = randomFlip(sample.flag_own_realty, 0.3);
  generated.cnt_children = Math.max(0, sample.cnt_children + Math.floor(Math.random() * 3 - 1));
  generated.cnt_fam_members = Math.max(1, sample.cnt_fam_members + Math.floor(Math.random() * 3 - 1));
  
  generated.name_education_type = randomChoice([sample.name_education_type, randomEducationType()], [0.7, 0.3]);
  generated.name_family_status = randomChoice([sample.name_family_status, randomFamilyStatus()], [0.7, 0.3]);
  generated.name_housing_type = randomChoice([sample.name_housing_type, randomHousingType()], [0.7, 0.3]);
  generated.occupation_type = randomChoice([sample.occupation_type, randomOccupationType()], [0.7, 0.3]);
  
  generated.amt_income_total = varyNumeric(sample.amt_income_total, 15);
  generated.name_income_type = randomChoice([sample.name_income_type, randomIncomeType()], [0.7, 0.3]);
  generated.amt_credit_x = varyNumeric(sample.amt_credit_x, 20);
  generated.amt_annuity_x = varyNumeric(sample.amt_annuity_x, 15);
  generated.amt_goods_price_x = varyNumeric(sample.amt_goods_price_x, 20);
  
  generated.days_birth = varyDays(sample.days_birth, 365 * 3);
  generated.days_employed = varyDays(sample.days_employed, 365 * 2);
  generated.days_registration = varyDays(sample.days_registration, 365 * 5);
  generated.days_id_publish = varyDays(sample.days_id_publish, 365 * 2);
  generated.days_last_phone_change = varyDays(sample.days_last_phone_change, 180);
  
  generated.flag_mobil = randomFlip(sample.flag_mobil, 0.1);
  generated.flag_emp_phone = randomFlip(sample.flag_emp_phone, 0.3);
  generated.flag_work_phone = randomFlip(sample.flag_work_phone, 0.3);
  generated.flag_cont_mobile = randomFlip(sample.flag_cont_mobile, 0.3);
  generated.flag_phone = randomFlip(sample.flag_phone, 0.3);
  generated.flag_email = randomFlip(sample.flag_email, 0.3);
  
  generated.region_population_relative = randomFlip(sample.region_population_relative, 0.2);
  generated.region_rating_client = Math.max(1, Math.min(3, sample.region_rating_client + Math.floor(Math.random() * 3 - 1)));
  generated.region_rating_client_w_city = Math.max(1, Math.min(3, sample.region_rating_client_w_city + Math.floor(Math.random() * 3 - 1)));
  generated.urban_rural = randomFlip(sample.urban_rural, 0.2);
  
  generated.reg_region_not_live_region = randomFlip(sample.reg_region_not_live_region, 0.2);
  generated.reg_city_not_live_city = randomFlip(sample.reg_city_not_live_city, 0.2);
  
  generated.name_contract_type_x = randomChoice([sample.name_contract_type_x, 'Cash loans', 'Revolving loans'], [0.6, 0.3, 0.1]);
  generated.weekday_appr_process_start_x = randomChoice([sample.weekday_appr_process_start_x, randomWeekday()], [0.7, 0.3]);
  generated.hour_appr_process_start_x = Math.floor(Math.random() * 24);
  
  generated.ext_source_2 = varyNumeric(sample.ext_source_2, 10, true);
  generated.ext_source_3 = varyNumeric(sample.ext_source_3, 10, true);
  generated.ext_source_2_missing = generated.ext_source_2 === null ? 1 : 0;
  generated.ext_source_3_missing = generated.ext_source_3 === null ? 1 : 0;
  
  generated.obs_30_cnt_social_circle = Math.max(0, sample.obs_30_cnt_social_circle + Math.floor(Math.random() * 3 - 1));
  generated.def_30_cnt_social_circle = Math.max(0, sample.def_30_cnt_social_circle + Math.floor(Math.random() * 2 - 1));
  generated.obs_60_cnt_social_circle = Math.max(0, sample.obs_60_cnt_social_circle + Math.floor(Math.random() * 3 - 1));
  generated.def_60_cnt_social_circle = Math.max(0, sample.def_60_cnt_social_circle + Math.floor(Math.random() * 2 - 1));
  
  generated.amt_req_credit_bureau_hour = Math.max(0, sample.amt_req_credit_bureau_hour + Math.floor(Math.random() * 2 - 1));
  generated.amt_req_credit_bureau_day = Math.max(0, sample.amt_req_credit_bureau_day + Math.floor(Math.random() * 2 - 1));
  generated.amt_req_credit_bureau_week = Math.max(0, sample.amt_req_credit_bureau_week + Math.floor(Math.random() * 2 - 1));
  generated.amt_req_credit_bureau_mon = Math.max(0, sample.amt_req_credit_bureau_mon + Math.floor(Math.random() * 3 - 1));
  generated.amt_req_credit_bureau_qrt = Math.max(0, sample.amt_req_credit_bureau_qrt + Math.floor(Math.random() * 2 - 1));
  generated.amt_req_credit_bureau_year = Math.max(0, sample.amt_req_credit_bureau_year + Math.floor(Math.random() * 5 - 2));
  
  generated.bureau_query_intensity = 
    generated.amt_req_credit_bureau_hour +
    generated.amt_req_credit_bureau_day +
    generated.amt_req_credit_bureau_week +
    generated.amt_req_credit_bureau_mon +
    generated.amt_req_credit_bureau_qrt +
    generated.amt_req_credit_bureau_year;
  
  for (let i = 2; i <= 21; i++) {
    const flagName = `flag_document_${i}`;
    generated[flagName] = randomFlip(sample[flagName], 0.3);
  }
  
  generated.has_all_docs = [
    generated.flag_document_3,
    generated.flag_document_6,
    generated.flag_document_8,
  ].filter(x => x === 1).length;
  
  generated.amt_annuity_y = varyNumeric(sample.amt_annuity_y, 20, true);
  generated.amt_application = varyNumeric(sample.amt_application, 25);
  generated.amt_credit_y = varyNumeric(sample.amt_credit_y, 20, true);
  generated.amt_goods_price_y = varyNumeric(sample.amt_goods_price_y, 25, true);
  
  generated.days_decision = varyDays(sample.days_decision, 90);
  
  generated.credit_income_ratio = generated.amt_credit_x / generated.amt_income_total;
  generated.annuity_income_ratio = generated.amt_annuity_x / generated.amt_income_total;
  generated.credit_goods_ratio = generated.amt_goods_price_x > 0 ? generated.amt_credit_x / generated.amt_goods_price_x : 1;
  generated.income_per_person = generated.amt_income_total / generated.cnt_fam_members;
  generated.children_ratio = generated.cnt_children / generated.cnt_fam_members;
  generated.payment_rate = generated.amt_credit_x > 0 ? generated.amt_annuity_x / generated.amt_credit_x : 0;
  
  generated.age_years = Math.abs(generated.days_birth) / 365.25;
  generated.employed_years = Math.abs(generated.days_employed) / 365.25;
  generated.employment_to_age_ratio = generated.employed_years / generated.age_years;
  
  generated.num_active_contacts = [
    generated.flag_mobil,
    generated.flag_emp_phone,
    generated.flag_work_phone,
    generated.flag_cont_mobile,
    generated.flag_phone,
    generated.flag_email,
  ].filter(x => x === 1).length;
  
  generated.has_work_contact = (generated.flag_work_phone === 1 || generated.flag_emp_phone === 1) ? 1 : 0;
  generated.stability_score = calculateStabilityScore(generated);
  generated.is_cashloan = generated.name_contract_type_x === 'Cash loans' ? 1 : 0;
  
  // Leave target as null - this is what the model will predict
  generated.target = null;
  
  return generated;
}

function varyNumeric(value: number | null, percentVariance: number, allowNull: boolean = false): number | null {
  if (value === null || value === undefined) {
    return allowNull ? null : 0;
  }
  
  const variance = value * (percentVariance / 100);
  const offset = (Math.random() * 2 - 1) * variance;
  const newValue = value + offset;
  
  return Math.max(0, Math.round(newValue * 100) / 100);
}

function varyDays(value: number | null, daysVariance: number, allowNull: boolean = false): number | null {
  if (value === null || value === undefined) {
    return allowNull ? null : 0;
  }
  
  const offset = Math.floor(Math.random() * daysVariance * 2 - daysVariance);
  const newValue = value + offset;
  
  return Math.min(0, newValue);
}

function randomFlip(value: number, flipProbability: number = 0.5): number {
  if (Math.random() < flipProbability) {
    return value === 1 ? 0 : 1;
  }
  return value;
}

function flipGender(gender: number): number {
  return gender === 1.0 ? 0.0 : 1.0;
}

function randomChoice<T>(options: T[], probabilities: number[]): T {
  const rand = Math.random();
  let cumulative = 0;
  
  for (let i = 0; i < options.length; i++) {
    cumulative += probabilities[i];
    if (rand <= cumulative) {
      return options[i];
    }
  }
  
  return options[options.length - 1];
}

function calculateStabilityScore(data: any): number {
  let score = 0;
  
  if (data.flag_own_car === 1) score++;
  if (data.flag_own_realty === 1) score++;
  
  if (data.employed_years > 5) score++;
  if (data.employed_years > 10) score += 2;
  
  if (data.reg_region_not_live_region === 0) score++;
  
  return score;
}

function randomEducationType(): string {
  const types = ['Secondary / secondary special', 'Higher education', 'Incomplete higher', 'Lower secondary', 'Academic degree'];
  return types[Math.floor(Math.random() * types.length)];
}

function randomFamilyStatus(): string {
  const statuses = ['Married', 'Single / not married', 'Civil marriage', 'Separated', 'Widow'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function randomHousingType(): string {
  const types = ['House / apartment', 'With parents', 'Municipal apartment', 'Rented apartment', 'Office apartment'];
  return types[Math.floor(Math.random() * types.length)];
}

function randomOccupationType(): string {
  const types = ['Laborers', 'Sales staff', 'Core staff', 'Managers', 'Drivers', 'High skill tech staff', 'Accountants'];
  return types[Math.floor(Math.random() * types.length)];
}

function randomIncomeType(): string {
  const types = ['Working', 'Commercial associate', 'Pensioner', 'State servant', 'Student', 'Businessman'];
  return types[Math.floor(Math.random() * types.length)];
}

function randomWeekday(): string {
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
  return days[Math.floor(Math.random() * days.length)];
}
