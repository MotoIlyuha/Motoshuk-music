import React from 'react';
import { useTSelector } from "@hooks/redux";
import { SongCard } from "@modules/SongCard";
import { useGetTopChartsQuery } from "@/redux/services/shazam.api";
import { Error, Loader } from "@/UI";
import { PageTitle } from "@UI/PageTitle";

const TopCharts = () => {
    const { activeSong, isPlaying } = useTSelector((state) => state.player);
    const { data, isFetching, error } = useGetTopChartsQuery();

    if (isFetching) return <Loader title="Loading top charts" />;

    if (error) return <Error />;

    return (
        <div className="flex flex-col ">
            <PageTitle>
                Discover Top Charts
            </PageTitle>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, i) => (
                    <SongCard
                        key={song.key}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        data={data}
                        i={i}
                    />
                ))}
            </div>
        </div>
    );
}

export default TopCharts;
