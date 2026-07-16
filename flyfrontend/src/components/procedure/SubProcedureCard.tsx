import Link from 'next/link';
import { getImageUrl } from '@/lib/helpers';
import type { Treatments } from '@/lib/types';

export default function SubProcedureCard({ treatment }: { treatment: Treatments }) {
	return (
		<div className="col-md-4 col-sm-6 mb-4">
			<Link href={`/all-procedure/${encodeURIComponent(treatment.name)}`} className="text-decoration-none">
				<div className="card h-100">
					<img src={getImageUrl(treatment.image_url)} className="card-img-top" alt={treatment.name} loading="lazy" />
					<div className="card-body">
						<h5 className="card-title" style={{ color: '#053862' }}>{treatment.name}</h5>
					</div>
				</div>
			</Link>
		</div>
	);
}
