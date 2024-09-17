interface IAuth {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
}

interface IListings {
  kind: string
  data: {
    after: string
    dist: number
    modhash: string
    geo_filter: string
    children: Array<IListingNewChildren>
    before: string
  }
  created_at: string
  id: number
  id_str: string
  name: string
  position?: any
  query: string
}

interface IListingNewChildren {
  kind: string
  data: IListingNewChildrenData
}

interface IListingNewChildrenData {
  approved_at_utc: string | null
  subreddit: string
  selftext: string
  author_fullname: string
  saved: boolean
  mod_reason_title: string | null
  gilded: number
  clicked: boolean
  title: string
  name: string
  created: number
  link_flair_richtext: Array<string>
  subreddit_name_prefixed: string
  hidden: boolean
  pwls: number
  link_flair_css_class: boolean
  downs: number
  thumbnail_height: boolean
  top_awarded_type: boolean
  hide_score: boolean
  quarantine: boolean
  link_flair_text_color: string
  upvote_ratio: number
  author_flair_background_color: string | null
  subreddit_type: string
  ups: number
  total_awards_received: number
  media_embed: object
  thumbnail_width: number | null
  author_flair_template_id: string | null
  is_original_content: boolean
  user_reports: Array<string>
  secure_media: string | null
  is_reddit_media_domain: boolean
  is_meta: boolean
  category: string | null
  secure_media_embed: object
  link_flair_text: string | null
  can_mod_post: boolean
  score: number
  approved_by: string | null
  is_created_from_ads_ui: boolean
  author_premium: boolean
  thumbnail: string
  edited: boolean
  author_flair_css_class: string | null
  author_flair_richtext: Array<string>
  gildings: object
  content_categories: string | null
  is_self: boolean
  mod_note: string | null
  link_flair_type: string
  wls: number
  removed_by_category: string | null
  banned_by: string | null
  author_flair_type: string
  domain: string
  allow_live_comments: boolean
  selftext_html: string
  likes: string | null
  suggested_sort: string | null
  banned_at_utc: string | null
  view_count: string | null
  archived: boolean
  no_follow: boolean
  is_crosspostable: boolean
  pinned: boolean
  over_18: boolean
  all_awardings: Array<string>
  awarders: Array<string>
  media_only: boolean
  can_gild: boolean
  spoiler: boolean
  locked: boolean
  author_flair_text: string | null
  treatment_tags: Array<string>
  visited: boolean
  removed_by: string | null
  num_reports: string | null
  distinguished: string | null
  subreddit_id: string
  author_is_blocked: boolean
  mod_reason_by: string | null
  removal_reason: string | null
  link_flair_background_color: string
  id: string
  is_robot_indexable: boolean
  report_reasons: string | null
  author: string
  discussion_type: string | null
  num_comments: 1
  send_replies: boolean
  whitelist_status: string
  contest_mode: boolean
  mod_reports: Array<string>
  author_patreon_flair: boolean
  author_flair_text_color: string | null
  permalink: string
  parent_whitelist_status: string
  stickied: boolean
  url: string
  subreddit_subscribers: number
  created_utc: number
  num_crossposts: number
  media: string | null
  is_video: boolean
}

export { IAuth, IListingNewChildren, IListingNewChildrenData, IListings }
