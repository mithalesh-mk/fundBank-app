import axiosInstance from "@/utils/axiosInstance";

export interface FundNAVResponse {
  meta: any;
  data: { date: string; nav: number }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
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

  async getAllFunds(page: number, limit: number, category: string[]) {
  const res = await axiosInstance.get<ApiResponse<MutualFundScheme[]>>(
    "/funds/allfunds",
    {
      params: {
        page,
        limit,
        category: category
      },
    }
  );

  return res.data.data;
}

}

export default new FundService();