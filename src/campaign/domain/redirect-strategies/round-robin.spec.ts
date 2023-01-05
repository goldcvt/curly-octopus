import { TargetsVisitsData } from '../types';
import { redirectStrategyFactory } from './index';

describe('Redirect-strategies / Round Robin', () => {
    it('When only 1 target url specified always returns it', () => {
        const expectedUrl = 'awesometarget.com';
        const targetUrls = [
            {
                visits: 0,
                targetUrl: 'awesometarget.com',
            },
        ];
        const roundRobinTargetPicker = redirectStrategyFactory('RoundRobin');
        const urlTry1 = roundRobinTargetPicker.pickTargetUrl(targetUrls);
        expect(urlTry1).toStrictEqual(expectedUrl);
        const urlTry2 = roundRobinTargetPicker.pickTargetUrl(targetUrls);
        expect(urlTry2).toStrictEqual(expectedUrl);
    });
    it('Index goes in loop', () => {
        const targetUrls: TargetsVisitsData = [
            {
                targetUrl: '1',
                visits: 0,
            },
            {
                targetUrl: '2',
                visits: 0,
            },
            {
                targetUrl: '3',
                visits: 0,
            },
        ];
        const roundRobinTargetPicker = redirectStrategyFactory('RoundRobin');

        expect(roundRobinTargetPicker.pickTargetUrl(targetUrls)).toStrictEqual(
            '1',
        );
        expect(roundRobinTargetPicker.pickTargetUrl(targetUrls)).toStrictEqual(
            '2',
        );

        roundRobinTargetPicker.pickTargetUrl(targetUrls);
        expect(roundRobinTargetPicker.pickTargetUrl(targetUrls)).toStrictEqual(
            '1',
        );
    });
});
