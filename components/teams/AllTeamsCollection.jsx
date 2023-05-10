import { getPublicTeamList } from '@/repositories/team_repository/teamRepoData';
import TeamCard from './TeamCard';

import React, { useEffect, useState } from 'react'

function AllTeamsCollection() {
    const [teamList, setTeamList] = useState()
    const fetchTeamList = async () => {
        const teamListResponce = await getPublicTeamList();
        setTeamList(teamListResponce)
    }

    useEffect(() => {
        fetchTeamList()
    }, [])

    return (
        <section class="bg-white dark:bg-gray-900">
            <div class="container mx-auto px-6 py-10">
                <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:mt-12 xl:gap-12">
                    {teamList?.map((value) => {
                        return <TeamCard team={value} />
                    })}
                </div>
            </div>
        </section>
    )
}

export default AllTeamsCollection