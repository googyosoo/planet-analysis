'use client';

import { solarSystemData } from '@/lib/planetData';
import Planet from './Planet';

export default function SolarSystem() {
    return (
        <>
            {solarSystemData.map((planet) => (
                <Planet key={planet.name} data={planet} />
            ))}
        </>
    );
}
