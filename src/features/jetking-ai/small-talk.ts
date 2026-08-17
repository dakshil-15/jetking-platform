/**
 * Local, no-model handling for greetings and small talk.
 *
 * Returns `null` when the message is a real question so the caller falls
 * through to the knowledge engine.
 */

export interface SmallTalkReply {
  text: string;
}

/** Lower-case, trim, and strip surrounding punctuation/emoji noise. */
function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const HELP =
  'I can help with courses, fees, placements, eligibility, centres, or franchise questions — just ask naturally.';

export function smallTalk(input: string): SmallTalkReply | null {
  const text = normalize(input);
  if (!text || text.split(' ').length > 6) return null;

  if (
    /^(hi+|hey+|h(e|a)llo+|helo+|hlo+|yo+|namaste|namaskar|hola|gm|ge|good (morning|afternoon|evening|noon|day))( there| jetking| team| bro| sir| maam| madam)?$/.test(
      text,
    )
  ) {
    return {
      text: `👋 Hi! I'm Jetking AI, your learning assistant. ${HELP} What would you like to know?`,
    };
  }

  if (
    /^(thanks|thank you|thank u|thanku|thnx|thnks|thx|ty|dhanyavaad|dhanyawad|shukriya)( so much| a lot| bhai| jetking)?$/.test(
      text,
    )
  ) {
    return {
      text: "You're welcome! 😊 Anything else about courses, fees, placements or centres?",
    };
  }

  if (/^(bye+|goodbye|good bye|ok bye|okay bye|see ya|see you|tata|cya)$/.test(text)) {
    return {
      text: 'Take care! 👋 Come back anytime you have a question about Jetking.',
    };
  }

  if (
    /^(how are you|how r u|how are u|hows it going|kaise ho|kaisa hai|kya haal hai)( doing)?$/.test(
      text,
    )
  ) {
    return {
      text: `I'm doing great, thanks for asking! 😊 ${HELP}`,
    };
  }

  if (
    /^(who are you|what are you|what is this|what can you do|what do you do|help|aap kaun ho|tum kaun ho|kya kar sakte ho)$/.test(
      text,
    )
  ) {
    return {
      text: `I'm Jetking AI — an assistant for Jetking courses, fees, placements, centres, and franchise enquiries. ${HELP}`,
    };
  }

  if (
    /^(ok|okay|k|kk|acha|achha|hmm+|thik hai|theek hai|cool|nice|great|good|awesome)$/.test(text)
  ) {
    return {
      text: `👍 Sure! ${HELP}`,
    };
  }

  return null;
}
