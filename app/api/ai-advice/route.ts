import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, financialContext } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY is not configured. Please set it in your environment variables.' },
        { status: 500 }
      )
    }

    // Dynamically import Groq to avoid build-time issues
    const { Groq } = await import('groq-sdk')
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    })

    const systemPrompt = `You are a professional AI financial advisor specializing in credit score improvement. 
Your job is to give concise, specific, actionable advice based on the user's real financial numbers.
Always reference their actual data (credit score, utilization %, savings rate, etc.) in your response.
Keep responses under 200 words. Use bullet points for action steps. Be direct and encouraging.
Never give generic advice — always tie it back to the user's specific numbers.
This is educational guidance, not professional financial advice.`

    const userPromptWithContext = `User's Financial Profile:
${financialContext}

User's Question: ${message}`

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPromptWithContext,
        },
      ],
      model: 'llama-3.1-8b-instant',
      max_tokens: 400,
      temperature: 0.7,
    })

    const advice = response.choices[0]?.message?.content || 'Unable to generate advice at this moment.'

    return NextResponse.json({ advice })
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to get AI advice' },
      { status: 500 }
    )
  }
}
