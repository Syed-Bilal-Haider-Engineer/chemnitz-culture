export interface MapProps {
  geoData: any | null,
  activeCategory:number
}

export type ErrorMessageProps = {
  message: string;
  onRetry?: () => void;
};

export interface SearchBarProps {
  geoData: any
  searchHanlde?: (key: string) => void
  handleRefresh?: () => void
}

export interface TextCardProps {
  id:string;
  title: string;
  description: string;
  rating?: number;
  reviews?: number;
  onView?: () => void;
  token:string;
  refetch?: () => void
}

export interface FavoriteFunctionalityProps {
  id: string
  onFavoriteChange?: () => void // New callback prop
}

export interface PopupCardProps {
  id: string;
  name?: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
 user:{
    email:string;
    name: string;
 }
}

export interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
  featureId: string;
  token:string;
  onReviewSubmit: (rating: number, comment: string) => Promise<void>;
  onReviewRemove:(id:string) => Promise<void>,
  onReviewUpdate:(rating: number,editingReviewId:string, reviewText: string) => Promise<void>;
}

export interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isSignUp: boolean;
  setIsSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  isProfile: boolean;
  setIsProfile: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setTokenState: React.Dispatch<React.SetStateAction<string>>;
  logout: () => void;
}