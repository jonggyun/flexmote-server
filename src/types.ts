export interface CompanyProps {
  company_id: string;
  company_name: string;
  description: string;
  homepage: string;
  location: string;
  is_remote: boolean;
  remote_rule: string;
  is_flexible: boolean;
  flexible_rule: string;
}

export interface FlexibleProps {
  company_id: string;
  is_flexible: boolean;
  rule: string;
}

export interface RemoteProps {
  company_id: string;
  is_remote: boolean;
  rule: string;
}

export interface CommentProps {
  comment_id: string;
  company_id: string;
  user_id: string;
  username: string;
  title: string;
  content: string;
  rating: number;
  created_at: string;
  updated_at: string;
}
