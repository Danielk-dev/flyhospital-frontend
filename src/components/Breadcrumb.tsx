import Link from 'next/link';
import type { BreadcrumbItem } from '@/lib/types';

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb">
				{items.map((item, index) => (
					<li key={index} className={`breadcrumb-item${item.active ? ' active' : ''}`}>
						{!item.active && item.link ? (
							<>
								<Link href={item.link}>{item.label}</Link>
								<span style={{ fontSize: '21px', color: 'rgba(0, 61, 111, 0.6)' }}>
									<i className="bi bi-chevron-right text-secondary" />
								</span>
							</>
						) : (
							item.label
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}
