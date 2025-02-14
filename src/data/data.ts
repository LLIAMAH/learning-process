import {EStatus} from "../interfaces/interfaces.ts";

export const USER = {
    position: 'Software developer',
    fullName: 'Vasiliy Himchenko',
    photo: 'https://picsum.photos/200/200',
    location: 'Riga, Latvia',
    department: 'Development',
    email: 'aaaaaaaaaaa@aaaaaaa.com',
    phone: '+371 26321658',
    currentCourse: {
        title: 'React',
        source: 'https://reactjs.org/',
        status: EStatus[EStatus.Pending],
        sections: [
            {
                sequence: 1,
                title: 'Introduction',
                status: EStatus.Pending
            },
            {
                sequence: 2,
                title: 'First look',
                status: EStatus.Pending
            },
            {
                sequence: 3,
                title: 'Types',
                status: EStatus.Pending
            },
            {
                sequence: 4,
                title: 'Functions',
                status: EStatus.Pending
            }
        ]
    },
    history: [
        {
            title: 'Course 1',
            source: 'Course 1',
            status: EStatus[EStatus.Completed],
            sections: [
                {
                    sequence: 1,
                    title: 'Sequence 1',
                    status: EStatus[EStatus.Completed],
                },
                {
                    sequence: 2,
                    title: 'Sequence 2',
                    status: EStatus[EStatus.Completed],
                },
                {
                    sequence: 3,
                    title: 'Sequence 3',
                    status: EStatus[EStatus.Completed],
                },
            ]
        },
        {
            title: 'Course 2',
            source: 'Course 2',
            status: EStatus[EStatus.Completed],
            sections: [
                {
                    sequence: 1,
                    title: 'Sequence 1',
                    status: EStatus[EStatus.Completed],
                },
                {
                    sequence: 2,
                    title: 'Sequence 2',
                    status: EStatus[EStatus.Completed],
                },
                {
                    sequence: 3,
                    title: 'Sequence 3',
                    status: EStatus[EStatus.Completed],
                },
            ]
        },
        {
            title: 'Course 3',
            source: 'Course 3',
            status: EStatus[EStatus.Completed],
            sections: [
                {
                    sequence: 1,
                    title: 'Sequence 1',
                    status: EStatus[EStatus.Completed],
                },
                {
                    sequence: 2,
                    title: 'Sequence 2',
                    status: EStatus[EStatus.Completed],
                },
                {
                    sequence: 3,
                    title: 'Sequence 3',
                    status: EStatus[EStatus.Completed],
                },
            ]
        }
    ],
    subordinates: []
}