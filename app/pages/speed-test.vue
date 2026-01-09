<template>
	<div class="container my-5">
		<h1 class="mb-4">Speed Test & Performance Metrics</h1>
		
		<div class="card mb-4">
			<div class="card-header bg-primary text-white">
				<h5 class="mb-0">Page Load Times</h5>
			</div>
			<div class="card-body">
				<div class="row">
					<div class="col-md-4 mb-3">
						<div class="metric-box">
							<h6>DOM Ready</h6>
							<p class="metric-value">{{ metrics.domReady }}ms</p>
						</div>
					</div>
					<div class="col-md-4 mb-3">
						<div class="metric-box">
							<h6>Page Load</h6>
							<p class="metric-value">{{ metrics.pageLoad }}ms</p>
						</div>
					</div>
					<div class="col-md-4 mb-3">
						<div class="metric-box">
							<h6>Time to Interactive</h6>
							<p class="metric-value">{{ metrics.interactive }}ms</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="card mb-4">
			<div class="card-header bg-success text-white">
				<h5 class="mb-0">Header API Calls (Loaded on Every Page)</h5>
			</div>
			<div class="card-body">
				<div v-if="headerApis.length === 0" class="text-muted">
					Measuring...
				</div>
				<div v-else>
					<div v-for="(api, index) in headerApis" :key="index" class="api-item mb-3 p-3 border rounded">
						<div class="d-flex justify-content-between align-items-center">
							<div>
								<strong>{{ api.name }}</strong>
								<br>
								<small class="text-muted">{{ api.url }}</small>
							</div>
							<div class="text-end">
								<span :class="api.cached ? 'badge bg-info' : (api.status === 'Success' ? 'badge bg-success' : 'badge bg-danger')">
									{{ api.status }}
								</span>
								<br>
								<strong class="text-primary" v-if="!api.cached">{{ api.time }}ms</strong>
								<strong class="text-success" v-else>Already loaded</strong>
							</div>
						</div>
					</div>
					<div class="alert alert-info mt-3" v-if="headerApis.some(api => !api.cached)">
						<strong>Note:</strong> These API calls were made on this page load. 
						On subsequent pages, they will be cached and won't be called again.
					</div>
					<div class="alert alert-success mt-3" v-else>
						<strong>Great!</strong> These APIs are already cached from a previous page load. 
						No API calls were made on this page, which is why it loads faster.
					</div>
				</div>
			</div>
		</div>

		<div class="card mb-4">
			<div class="card-header bg-info text-white">
				<h5 class="mb-0">Performance Analysis</h5>
			</div>
			<div class="card-body">
				<div class="performance-analysis">
					<p><strong>Total Load Time:</strong> <span class="text-primary">{{ metrics.pageLoad }}ms</span></p>
					<p><strong>Header API Calls Time:</strong> <span class="text-primary">{{ totalApiTime }}ms</span></p>
					<p><strong>Other Resources:</strong> <span class="text-primary">{{ metrics.pageLoad - totalApiTime }}ms</span></p>
					
					<div class="progress mt-3" style="height: 30px;" v-if="metrics.pageLoad > 0">
						<div class="progress-bar bg-success" role="progressbar" 
							:style="`width: ${totalApiTime > 0 ? (totalApiTime / metrics.pageLoad * 100) : 0}%`">
							API Calls: {{ totalApiTime > 0 ? Math.round(totalApiTime / metrics.pageLoad * 100) : 0 }}%
						</div>
						<div class="progress-bar bg-info" role="progressbar" 
							:style="`width: ${totalApiTime > 0 ? ((metrics.pageLoad - totalApiTime) / metrics.pageLoad * 100) : 100}%`">
							Other: {{ totalApiTime > 0 ? Math.round((metrics.pageLoad - totalApiTime) / metrics.pageLoad * 100) : 100 }}%
						</div>
					</div>
					<div v-else class="text-muted mt-3">
						Page load metrics not available yet.
					</div>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-header bg-warning text-dark">
				<h5 class="mb-0">Recommendations</h5>
			</div>
			<div class="card-body">
				<ul>
					<li v-if="totalApiTime > 2000" class="text-danger">
						<strong>High Priority:</strong> Header API calls are taking too long ({{ totalApiTime }}ms). 
						Consider caching or lazy loading.
					</li>
					<li v-else class="text-success">
						Header API calls are reasonable ({{ totalApiTime }}ms).
					</li>
					<li>Consider loading header data only when dropdown is opened (lazy loading).</li>
					<li>Implement caching for treatments and destinations data.</li>
					<li>Use SSR to pre-render header data on server side.</li>
				</ul>
			</div>
		</div>

		<div class="mt-4">
			<button @click="refreshMetrics" class="btn btn-primary">Refresh Metrics</button>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useGeneralStore } from '~/stores/general';

const generalStore = useGeneralStore();
const config = useRuntimeConfig();

const metrics = ref({
	domReady: 0,
	pageLoad: 0,
	interactive: 0,
});

const headerApis = ref([]);
const startTime = ref(0);

const totalApiTime = computed(() => {
	return headerApis.value
		.filter(api => !api.cached)
		.reduce((total, api) => total + api.time, 0);
});

const measureLoadTime = () => {
	if (typeof window === 'undefined' || !window.performance) return;

	const perfData = window.performance.timing;
	
	if (perfData) {
		metrics.value.domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart;
		metrics.value.pageLoad = perfData.loadEventEnd - perfData.navigationStart;
		metrics.value.interactive = perfData.domInteractive - perfData.navigationStart;
	}
};

const measureHeaderApis = async () => {
	headerApis.value = [];
	
	// Check if data is already in store (means Header already loaded it)
	const treatmentsInStore = generalStore.treatments.length > 0;
	const destinationsInStore = generalStore.destinations.length > 0;
	
	const apis = [
		{ 
			name: 'Treatments', 
			url: `${config.public.baseUrl}/treatments`,
			inStore: treatmentsInStore
		},
		{ 
			name: 'Destinations', 
			url: `${config.public.baseUrl}/destinations`,
			inStore: destinationsInStore
		},
	];

	for (const api of apis) {
		if (api.inStore) {
			// Data already loaded by Header - no need to call API
			headerApis.value.push({
				name: api.name,
				url: api.url,
				time: 0,
				status: 'Cached (from Header)',
				cached: true,
			});
		} else {
			// Data not in store - measure API call
			const apiStartTime = performance.now();
			try {
				await $fetch(api.url);
				const apiEndTime = performance.now();
				const time = Math.round(apiEndTime - apiStartTime);
				headerApis.value.push({
					name: api.name,
					url: api.url,
					time,
					status: 'Success',
					cached: false,
				});
			} catch (error) {
				const apiEndTime = performance.now();
				const time = Math.round(apiEndTime - apiStartTime);
				headerApis.value.push({
					name: api.name,
					url: api.url,
					time,
					status: 'Error',
					cached: false,
				});
			}
		}
	}
};

const refreshMetrics = () => {
	measureLoadTime();
	measureHeaderApis();
};

onMounted(() => {
	startTime.value = performance.now();
	
	// Measure load time after page is fully loaded
	if (document.readyState === 'complete') {
		measureLoadTime();
		setTimeout(() => {
			measureHeaderApis();
		}, 500);
	} else {
		window.addEventListener('load', () => {
			measureLoadTime();
			setTimeout(() => {
				measureHeaderApis();
			}, 500);
		});
	}
});
</script>

<style scoped>
.metric-box {
	padding: 1.5rem;
	background: #f8f9fa;
	border-radius: 8px;
	text-align: center;
	border: 2px solid #e9ecef;
}

.metric-box h6 {
	color: #6c757d;
	font-size: 0.875rem;
	margin-bottom: 0.75rem;
	font-weight: 600;
}

.metric-value {
	font-size: 2rem;
	font-weight: 700;
	color: #053862;
	margin: 0;
}

.api-item {
	background: #f8f9fa;
	transition: all 0.3s ease;
}

.api-item:hover {
	background: #e9ecef;
	transform: translateX(5px);
}

.performance-analysis p {
	font-size: 1.1rem;
	margin-bottom: 0.5rem;
}

.progress-bar {
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	font-weight: 600;
}
</style>

