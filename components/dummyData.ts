export const courses = [
    {
        courseId: 'ID1',
        price: 50,
        courseName: 'Fitness Fundamentals',
        coursePicture: 'https://example.com/fitness_fundamentals.jpg',
        createdAt: new Date('2023-04-10'),
        teachers: ['John Doe', 'Emily Smith'],
        students: ['Alice Johnson', 'Michael Brown', 'Sophia Lee'],
        likes: 1200,
        courseDescription: 'A comprehensive course covering the basics of fitness and exercise.',
        courseOutline: [
            'Introduction to Fitness',
            'Strength Training Techniques',
            'Cardiovascular Workouts',
            'Nutrition Basics',
            'Recovery and Rest',
            'Goal Setting and Motivation'
        ],
        courseVideos: [
            {
                title: 'Introduction',
                videoUrl: 'https://example.com/intro_video.mp4'
            },
            {
                title: 'Strength Training',
                videoUrl: 'https://example.com/strength_training.mp4'
            },
            {
                title: 'Cardio Workout',
                videoUrl: 'https://example.com/cardio_workout.mp4'
            },
            {
                title: 'Nutrition Essentials',
                videoUrl: 'https://example.com/nutrition_essentials.mp4'
            },
            {
                title: 'Rest and Recovery',
                videoUrl: 'https://example.com/rest_and_recovery.mp4'
            }
        ]
    },
    {
        courseId: 'ID2',
        price: 75,
        courseName: 'Yoga for Beginners',
        coursePicture: 'https://example.com/yoga_beginners.jpg',
        createdAt: new Date('2023-05-15'),
        teachers: ['Anna Thompson'],
        students: ['David Rodriguez', 'Emma White'],
        likes: 800,
        courseDescription: 'Learn the fundamentals of yoga practice and improve flexibility and mindfulness.',
        courseOutline: [
            'Introduction to Yoga',
            'Basic Yoga Poses',
            'Breathing Techniques',
            'Meditation Practices',
            'Yoga Philosophy'
        ],
        courseVideos: [
            {
                title: 'Yoga Introduction',
                videoUrl: 'https://example.com/yoga_intro.mp4'
            },
            {
                title: 'Basic Poses Tutorial',
                videoUrl: 'https://example.com/basic_poses_tutorial.mp4'
            },
            {
                title: 'Breathwork Exercises',
                videoUrl: 'https://example.com/breathwork_exercises.mp4'
            },
            {
                title: 'Guided Meditation',
                videoUrl: 'https://example.com/guided_meditation.mp4'
            }
        ]
    },
    // Add more courses here
];

export const student = {
    name : "Tahir Mansour",
    courses : ['ID1' , 'ID2' , 'ID3'],
}