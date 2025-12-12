import axiosInstance from "@/utils/axiosInstance";

export interface FundNAVResponse {
  meta: any;
  data: { date: string; nav: number }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface SchemeName {
  scheme_code: string;
  scheme_name: string;
}

// swp.types.ts

export interface IntervalNav {
  date: string;
  nav: string;
}


export interface SwpReportItem {
  units: number;
  cumulative_units: number;
  cash_flow: number;
  net_amount: number;
  capital_gains_loss: number;
  current_nav: number;
  current_value: number;
  current_date: string;
}

export interface SwpResponse {
  file_path: string;
  interval_nav: IntervalNav[];
  success: boolean;
  swp_report: SwpReportItem[];
}

export interface SwpPostData {
  scheme_code: string;
  swp_date: number;
  invest_date: string;
  start_date: string;
  end_date: string;
  total_invested_amount: number;
  withdrawal_amount: number;
  interval: string;
}



export interface MutualFundScheme {
  id: string;
  scheme_code: string;
  isin_growth: string;
  isin_reinvest: string;
  scheme_name: string;
  parent_name: string;
  parent_key: string;
  fund_house: string;
  fund_house_key: string;
  category_header: string;
  category: string;
  sub_category: string;
  y1_return: number;
  y3_return: number;
  y5_return: number;
  cagr_1y: number;
  cagr_3y: number;
  cagr_5y: number;
  plan_type: string;
  option_type: string;
  frequency: string;
  nav: number;
  nav_date: string;         // empty string allowed
  display_name: string;
  amc_img: string;          // empty string allowed
}




class FundService {
  async getFundNAV(schemeCode: string, start?: string, end?: string): Promise<FundNAVResponse> {
    const res: { data: FundNAVResponse } = await axiosInstance.get(`/funds/${schemeCode}`, {
      params: { startDate: start, endDate: end }
    });
    return res.data;
  }

  async getAllFunds(page: number, limit: number, category: string[],fundhouse: string[], sortBy?: string, order?:number): Promise<MutualFundScheme[]> {
  const res = await axiosInstance.get<ApiResponse<MutualFundScheme[]>>(
    "/funds/allfunds",
    {
        params: {
          page,
          limit,
          category,
          fundhouse,
          sortBy, 
          order
        },
      }
    );

    return res.data.data;
  }

  async getSchemeNames(amcName: string): Promise<SchemeName[]> {
    const res = await axiosInstance.get<SchemeName[]>(`/funds/amc/${amcName}`);
    return res.data;
  }

  async calculateSwp(postData: SwpPostData): Promise<SwpResponse> {
    const { data } = await axiosInstance.post<SwpResponse>(
      "funds/swp",
      postData
    );

    return data;
  }



async searchFunds(query: string, signal?: AbortSignal) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_API_BASE_URL}/funds/search?query=${query}&limit=5`, {
    method: "GET",
    signal,
    headers: {
      "Content-Type": "application/json"
    }
  });

  const json = await res.json();
  return json.data;
}

}

export default new FundService();