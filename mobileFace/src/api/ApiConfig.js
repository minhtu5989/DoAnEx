import wretch from 'wretch';
import { BASE_URL } from "@constants/index";
const keyApi = '4f12445ce8f84307897b1673854ed6b1'   //  13/5


const StatusTranning = wretch(`${BASE_URL}/largepersongroups`);
const Detect = wretch(`${BASE_URL}/detect`);
const CreateClass = wretch(`${BASE_URL}/largepersongroups`);

export const api = {
    StatusTranning,
    Detect,
    keyApi,
    CreateClass,
};


//  key2 = de985e2ed05f4956bc7124a7ee19ed0f