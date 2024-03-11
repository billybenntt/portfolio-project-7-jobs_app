import {useEffect} from 'react'
import {showStats} from '../../store/features/allJobs/allJobsSlice.ts'
import {Loading, StatsContainer, ChartsContainer} from '../../components'
import {useAppSelector, useAppDispatch} from '../../store/hooks.ts';


function StatsPage() {

    const {isLoading, monthlyApplications} = useAppSelector(store => store.allJobs)
    const showCharts = monthlyApplications.length > 0
    const dispatch = useAppDispatch()

    // EFFECT - LOAD DATA
    useEffect(() => {
        dispatch(showStats())
    }, [])


    // LOADING RETURN
    if (isLoading) {
        return (
            <Loading/>
        )
    }

    // DEFAULT RETURN
    return (
        <>
            <StatsContainer/>
            {showCharts && <ChartsContainer/>}
        </>
    )
}

export default StatsPage