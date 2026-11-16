export interface Game {
  id: string;
  title: string;
  description: string;
  releaseDate: string;
  categories: string[];
  image: string;
  downloadUrl: string;
  videoUrl?: string | null;
  featured?: boolean;
  status?: string;
}
