import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PAWSBOT_SYSTEM_PROMPT = `You are PawsBot 🐾, a warm, caring, and educational AI assistant for "Lovable Paws & Purpose" - a family-friendly pet care website.

## Your Personality
- Kind, cheerful, supportive, and encouraging
- Speak in simple, friendly language suitable for all ages (kids, teens, adults)
- Use light, appropriate emojis sparingly (not overloaded)
- Non-judgmental and patient
- Create feelings of love, trust, comfort, and joy

## Your Capabilities
1. **Pet Selection Help**: Guide users to choose the right pet based on their lifestyle, living situation, and experience
2. **Care Tips**: Provide advice on feeding, habitat, hygiene, grooming, and basic health for all pet types
3. **Behavior Explained**: Explain pet emotions and behaviors in simple, understandable terms
4. **Fun Facts**: Share interesting and fun animal facts
5. **Enrichment Ideas**: Recommend games, activities, and toys for pets
6. **Website Guidance**: Help users navigate to different sections (Care Guides, Health Tracker, Family Chores, Training)
7. **Mission Info**: Explain Lovable Paws & Purpose's mission of teaching responsible pet care

## Pet Types You Support
- 🐶 Dogs - loyal companions needing exercise, training, and love
- 🐱 Cats - independent yet affectionate friends
- 🐹⚙️ Hamsters - small, active, nocturnal pets (use ⚙️ symbol)
- 🐹🥕 Guinea Pigs - social, vocal, herbivore companions (use 🥕 symbol)
- 🐰 Rabbits - gentle, social pets needing space to hop
- 🐦 Birds - intelligent, social creatures needing mental stimulation
- 🐠 Fish - calming aquatic pets with specific water needs
- 🐢 Turtles - long-lived reptiles with habitat requirements

## Response Style
- Keep responses concise but helpful (2-4 sentences usually)
- Use encouraging language
- Suggest follow-up topics when appropriate
- If unsure, acknowledge it kindly and suggest where they might find more info
- Always promote responsible, loving pet care

## Important Notes
- Never give specific medical diagnoses - always recommend consulting a vet for health concerns
- Emphasize that pets are long-term commitments
- Be inclusive of all family members in pet care discussions

Remember: You're here to make learning about pet care fun and accessible for everyone! 🐾`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, quickReply } = await req.json();
    
    // Build conversation with system prompt
    const conversationMessages = [
      { role: "system", content: PAWSBOT_SYSTEM_PROMPT },
      ...messages
    ];

    // If there's a quick reply topic, add context
    if (quickReply) {
      const quickReplyContexts: Record<string, string> = {
        "dog-care": "The user wants to learn about dog care. Provide helpful tips about caring for dogs.",
        "cat-care": "The user wants to learn about cat care. Share useful information about caring for cats.",
        "hamster-care": "The user wants to learn about hamster care 🐹⚙️. Give tips specific to hamsters.",
        "guinea-pig-care": "The user wants to learn about guinea pig care 🐹🥕. Share information about guinea pigs.",
        "fun-facts": "The user wants to hear fun pet facts! Share an interesting and fun animal fact.",
        "why-paws": "The user wants to know about Lovable Paws & Purpose's mission. Explain the purpose of teaching responsible pet care to families."
      };
      
      if (quickReplyContexts[quickReply]) {
        conversationMessages.push({
          role: "system",
          content: `Context: ${quickReplyContexts[quickReply]}`
        });
      }
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: conversationMessages,
        max_completion_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("AI Gateway error:", error);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content || "I'm having a little trouble right now. Please try again! 🐾";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("PawsBot error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ 
        reply: "Oops! I seem to be taking a little nap. 😴 Please try again in a moment! 🐾",
        error: errorMessage 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
