import Link from 'next/link';
import { getImageUrl } from '@/lib/helpers';
import type { Treatments } from '@/lib/types';

export default function ProcedureCard({ treatment }: { treatment: Treatments }) {
	return (
		<div className="col-md-3 col-sm-6 mb-4">
			<Link href={`/subprocedure/${treatment.id}?name=${encodeURIComponent(treatment.name)}`} className="text-decoration-none">
				<div className="card h-100 card-custom">
					<img src={getImageUrl(treatment.image_url)} className="card-img-top card-img-top-custom" alt={treatment.name} loading="lazy" />
					<div className="card-body card-body-custom">
						<h5 className="card-title" style={{ color: '#053862' }}>{treatment.name}</h5>
					</div>
				</div>
			</Link>
		</div>
	);
}
