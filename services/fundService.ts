import axiosInstance from "@/utils/axiosInstance";

export interface FundNAVResponse {
  meta: any;
  data: { date: string; nav: number }[];
}

class FundService {
  async getFundNAV(schemeCode: string, start?: string, end?: string): Promise<FundNAVResponse> {
    const res: { data: FundNAVResponse } = await axiosInstance.get(`/funds/${schemeCode}`, {
      params: { startDate: start, endDate: end }
    });
    return res.data;
  }
}

export default new FundService();