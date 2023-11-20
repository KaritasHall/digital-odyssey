# Welcome to Digital Odyssey! :crossed_swords:

This is an AI powered text adventure game, using OpenAI with Vercel's AI SDK.

This project is an updated version of [AI adventure](https://github.com/KaritasHall/ai-adventure). I wanted to recreate this project with a new tech stack and specifically try out the new AI SDK from Vercel. I also wanted to add an authentication system allowing users to save their game. The main issue I was having with the OpenAI api at the time was the lenghty response time which caused a timeout when deployed with Vercel. You can now set responses to [streaming](https://platform.openai.com/docs/guides/production-best-practices/streaming) which probably helps. 


Anyway I highly recommend trying out the new SDK as the response time is quite fast and it has all the chat functionality built in :fire:
<br> Digital Odyssey is built with:
- Next.js 
- NextAuth
- Firebase
- Tailwind
- RadixUI

## Goals
My personal goals for this project were to:
- Familiarize myself with the new app router system from Next.js. 
- Learn how to set up an authentication flow using providers. NextAuth simplifies this process a lot and is so nice to use! I liked [this course](https://frontendmasters.com/courses/web-auth-apis/) to get a better overview of login practices.
- Make dynamic themes with Tailwind. I still love Vanilla Extract for typesafe themes, but I'm in my Tailwind era :nail_care:
- Try out a UI library. Acessibility is one of my main priorities and that was my main motivation for using something like RadixUI. It comes unstyled, so you have full control, it's perfect for creating reusable components. It's so easy to use and saves a lot of time. Really enjoyed trying this out.
