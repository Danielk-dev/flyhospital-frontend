export interface Treatments {
	id: number;
	name: string;
	description: string;
	image_url: string;
	price?: string;
	created_at?: string;
	updated_at?: string;
	slug?: string;
}

export interface Destination {
	id: number;
	region_id: number;
	name: string;
	country_name?: string;
	description: string;
	image_url: string;
	created_at?: string;
	updated_at?: string;
	slug?: string;
	secondary_image?: string;
	second_image?: string;
	hospitals_count?: string | number;
}

export interface Hospital {
	id: number;
	name?: string;
	title?: string;
	image_url?: string;
	image_urls?: string[];
	description?: string;
	average_rating?: string;
	total_reviews?: number;
	phone?: string;
	address?: string;
	country_id?: string | number;
	google_map_location?: string;
	website_url?: string;
	treatments?: Treatments[];
	[key: string]: unknown;
}

export interface Media {
	id: number;
	original_url: string;
	preview_url?: string;
}

export interface Blog {
	id: number;
	title: string;
	content: string;
	image_url: string;
	tags?: string;
	created_at?: string;
	updated_at?: string;
	slug?: string;
	media?: Media[];
}

export interface Region {
	id: number;
	name: string;
}

export interface Country {
	id: number | string;
	country_name: string;
	slug?: string;
	image_url?: string;
	media?: Media[];
}

export interface City {
	id: number | string;
	name: string;
	country_id?: number | string;
}

export interface PaginatedResponse<T> {
	current_page: number;
	data: T[];
	last_page: number;
	next_page_url: string | null;
	prev_page_url: string | null;
	total: number;
}

export interface ApiResponse<T> {
	status?: boolean;
	success?: boolean;
	data: T;
	total_hospitals?: number;
}

export interface ContactCategory {
	id: number;
	name: string;
}

export interface ContactForm {
	name: string;
	email: string;
	phone: string;
	subject: string;
	message: string;
	contact_category_id: number | string;
}

export interface BreadcrumbItem {
	label: string;
	link?: string;
	active?: boolean;
}
