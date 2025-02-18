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
        title: 'Course Test',
        source: 'Course Test',
        sections: [
            {
                sequence: 1,
                title: 'Sequence 1',
                status: EStatus[EStatus.Pending],
            },
            {
                sequence: 2,
                title: 'Sequence 2',
                status: EStatus[EStatus.Pending],
            },
            {
                sequence: 3,
                title: 'Sequence 3',
                status: EStatus[EStatus.Pending],
            },
        ]
    },
    history: [
        {
            title: 'Course 1',
            source: 'Course 1',
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