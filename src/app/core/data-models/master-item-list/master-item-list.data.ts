export interface MasterItemListData {
    [key:string]: AllMasterItemData[];
}

export interface AllMasterItemData {
    guid?:             string;
    item_list_id?:     number;
    item_id?:          number;
    item_type?:        string;
    company_name?:        string;
    item_icon?:        string;
    item_title_hn?:    string;
    item_title_en?:    string;
    description_hn?:   string;
    description_en?:   string;
    max_amount?:       string;
    max_range?:        string;
    interest_rate?:    string;
    monthly_interest?: string;
    processing_fees?:  string;
    tenure?:           string;
    deal_type?:        string;
    redirect_url?:     null;
    is_redirect?:      boolean;
    is_active?:        boolean;
    is_trusted?:        boolean;
    created_on?:       Date;
    created_by?:       string;
    modified_on?:      Date;
    modified_by?:      string;
    user_ip?:          null;
}
