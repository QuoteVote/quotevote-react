// Important stuff, must always be imported on a storybook file
import React from 'react'
import { withKnobs } from '@storybook/addon-knobs/react'
import { withA11y } from '@storybook/addon-a11y'

// Apollo Imports not needed for story, just for calling data
// If you want to apply theme
// The component
import Post from './Post'
import PostSkeleton from './PostSkeleton'
import PostCard from './PostCard'

// Story config
export default {
  title: 'Post',
  component: Post,
  decorators: [withKnobs, withA11y],
}

const post = {
  creator: {
    name: 'John Doe',
    avatar: 'J',
  },
  created: '11/06/2018 11:00 AM',
  title: 'Title of a post',
  text: 'What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
  upvotes: 100,
  downvotes: 200,
  approvedBy: [],
  rejectedBy: [],
}

const user = {
  name: 'John Doe',
  avatar: 'J',
}

const postCardProps = {
  _id: 123,
  title: 'Title of a post',
  text: 'People that don\'t have fingers are pointless The other day my Hot Pocket had no pocket I know an Asian girl named Lonely When my mom tells me I\'m too loud I tell my girlfriend to shut up I love it when my room smells like pussy potpouri I\'m sitting down waiting for my pizza Who you talking about? Little Caesar? That nigga owe me money! I get more head than a helmet Oh my god I love Amish omelets Lil\' Wayne skateboards way better than Hopsin I was doing cocaine and sneezed and dropped the dope line I really want to punch you in the face until your face explodes Oh no! Oh no! My battery is low Uh oh, we got a badass over here You’re a ho and you don’t even know it Happy birthday I had the worst day of my life, oh my god I told the police officer, “shot gun” He still threw me in the back seat I’m not a normal black kid I don’t run fast and I’ve never been arrested This is Cyber Molestation and you are now being cyber molested Beggars can’t be choosers Shut the fuck up and listen Back the truck up into the garage and turn off the ignition I’m sorry mommy I did it without permission I like the way baby oil glistens on titties Music is my life and chicken strips is my soul I love watching bloopers of when strippers slip on their poles Nigga, nigga, nigga, nigga, nigga, nigga It makes my teeth white and my dick bigger Please stop leaving the jar ajar Meesa Jar Jar Binks All the pirates in Pirates of the Caribbean should have been Jamaican Doctors can only cure minor pains and not diseases Aziz is one of my favorite comedians Did you pee pee in the potty? I’ve never eaten a tootsie pop with three licks I like getting condoms from an abortion clinic [?] When pooping outside, make sure there’s no animals watching My girlfriend likes Sesame Street paper on her birthday gift I was born with testicles on my feet, call them footballs I have a bad cough; does anyone have Halls? I never say, “Pause,” when I say something gay The internet is a scary place; don’t give out your passwords I piss people off by eating hamburgers on Taco Tuesdays Rest in peace X-box, PlayStation 4 has killed you I’m thrilled to do more music with you Vagina is my main muse I just need a reminder if I forget Nobody ever picks me up when I hitchhike with my mask on Look at my mask—it’s golden Don’t ask…who am I? NoEmotion',
  upvotes: 100,
  downvotes: 200,
  url: '',
  bookmarkedBy: [],
  created: '11/06/2018 11:00 AM',
  onHidePost: () => {},
  onBookmark: () => {},
  creator: {
    name: 'John Doe',
    avatar: 'J',
  },
  activityType: 'POST',
  avatar: 'J',
}

export const Base = () => <Post post={post} user={user} />
export const Loading = () => <PostSkeleton />
export const Card = () => <PostCard {...postCardProps} />

Base.story = {
  parameters: {
    jest: ['Post.test.js'],
  },
}
