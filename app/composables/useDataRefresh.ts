/**
 * Composable for refreshing cached data
 * Use this when you need to force refresh data from API
 */
export const useDataRefresh = () => {
	const generalStore = useGeneralStore();

	/**
	 * Refresh all cached data
	 */
	const refreshAll = async () => {
		await generalStore.refreshAll();
	};

	/**
	 * Refresh specific data
	 */
	const refreshTreatments = async () => {
		await generalStore.fetchTreatments(true);
	};

	const refreshDestinations = async () => {
		await generalStore.fetchDestination(true);
	};

	const refreshHospitals = async () => {
		await generalStore.fetchHospitals(true);
	};

	const refreshBlogs = async () => {
		await generalStore.fetchBlogs(1);
	};

	return {
		refreshAll,
		refreshTreatments,
		refreshDestinations,
		refreshHospitals,
		refreshBlogs,
	};
};

