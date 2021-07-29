export interface DashboardData {
    banners?:   Banner[];
    item_type?: ItemType[];
}

export interface Banner {
    guid?:           string;
    dashboard_id?:   number;
    type?:           string;
    title_hn?:       string;
    title_en?:       string;
    description_hn?: string;
    description_en?: string;
    url?:            string;
    banner_image?:   string;
    is_active?:      boolean;
    created_on?:     Date;
    created_by?:     string;
    modified_on?:    Date;
    modified_by?:    string;
    user_ip?:        null;
}

export interface ItemType {
    guid?:         string;
    item_id?:      number;
    item_cat?:     string;
    item_icon?:    string;
    item_name_hn?: string;
    item_name_en?: string;
    is_active?:    boolean;
    created_on?:   Date;
    created_by?:   string;
    modified_on?:  Date;
    modified_by?:  string;
    user_ip?:      null;
}
