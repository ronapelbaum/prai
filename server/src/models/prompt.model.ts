export type PromptKey = 'default' | 'friendly_greeting' | 'strict_assistant' | 'generic_prayer' | 'sa_prayer';

export const Prompts: Record<PromptKey, string> = {
  default: 'You are a helpful assistant.',
  friendly_greeting: 'You are a friendly assistant who replies concisely and warmly.',
  strict_assistant: 'You are a formal assistant who responds with precise, short answers.',
  generic_prayer: 'Compose a short, inclusive, non-denominational prayer focusing on gratitude, compassion, and hope. Keep it under 120 words.',
  sa_prayer: `
  You are a compassionate spiritual guide who supports individuals working through a 12-step recovery program such as Alcoholics Anonymous (AA) or Substance Anonymous (SA). When the user requests a prayer for a specific step number (1 through 12), you respond with a gentle, uplifting, and encouraging prayer tailored to that step. Your prayers are inspired by the traditional texts and principles of the 12-step program, promoting acceptance, hope, surrender, personal growth, and spiritual connection.
  Your tone should be warm, empathetic, and respectful, helping the user feel supported on their journey. Avoid any language that might feel preachy or harsh. Instead, focus on healing, humility, courage, and serenity.
  When the user asks for a prayer for a particular step, include the step number and brief reminder of the step’s theme before the prayer to give context.
  Do not include the step number in the prayer, nor the step citation, just the prayer
  `,
};

export const SA_PRAYER_KEYPOINTS: Record<number, string[]> = {
  1: [
    "Acknowledgment of being powerless over the addiction to sexual fantasies, craving, and the constant pursuit of mental orgasm.",
    "Recognition that this addiction has made life unmanageable.",
    "Admission of repeated failed attempts to control or stop the addiction alone.",
    "Honest acceptance of the harm caused to relationships, trust, self-worth, and distancing from loved ones.",
    "Understanding that the addiction has displaced reality and prevented living a true, fulfilling life.",
    "Acceptance that the only power currently available is the admission of powerlessness.",
    "A heartfelt plea for help and the willingness to surrender and stop the struggle.",
    "Seeking strength to accept the truth about oneself, the disease, and the journey ahead.",
    "Desire to let go of the illusion of control and begin the path toward a truly gifted life.",
    "Gratitude for a clean day and a prayer for continued sobriety.",
    "Request to be freed from cravings, denial, and obsessive thoughts one moment at a time.",
    "Embracing vulnerability with honesty about fear, weakness, and despair.",
    "Asking for divine strength not to fight alone but to surrender control and trust in higher power.",
    "Longing for peace, calm, sanity, and the healing presence of spiritual support.",
    "Commitment to entrusting one’s desires and life to a higher power and readiness to receive help."
  ],
  2: [
    "Acknowledging the existence of a higher power and the need for a spiritual experience.",
    "Recognizing the power of prayer and the importance of a spiritual connection.",
    "Seeking guidance and support from a higher power.",
    "Understanding the importance of surrender and letting go of control.",
    "Acknowledging the power of a higher power and the need for a spiritual experience.",
    "Opening the heart to receive help and guidance from a higher power as understood personally.",
    "Choosing to believe that this higher power is a loving God who loves unconditionally despite human flaws.",
    "Believing that this love is not dependent on past actions or conditions, and is always available.",
    "Trusting that this loving presence is always waiting and ready to support whenever one chooses to lean on it.",
    "Recognizing that this higher power has the strength to release from the prison of cravings and restore sanity.",
    "Asking for help to see and appreciate the existing abundance and simple blessings in life.",
    "Recognizing the tendency to seek false pleasures or escape in painful or simulated experiences.",
    "Request for the ability to find deep satisfaction in everyday, pure moments (comfort, nature, simple joys).",
    "Desire to truly appreciate the love, presence, and connection with family, especially children.",
    "Seeking to be fully present with loved ones, free from distractions and denial.",
    "Asking for help to see the beauty and fulfillment in work and contributions made to others.",
    "Thankfulness for genuine human connection and the nourishment it brings to the soul.",
    "Request to release the need to search for artificial substitutes and to be filled with authentic and healthy experiences.",
    "A surrender of the urge to escape reality, seeking the desire and strength to fully live in the present moment."
  ],
  3: [
    "Acknowledging the existence of a higher power and the need for a spiritual experience.",
    "Recognizing the power of prayer and the importance of a spiritual connection.",
    "Seeking guidance and support from a higher power.",
    "Understanding the importance of surrender and letting go of control.",
    "Acknowledging the power of a higher power and the need for a spiritual experience.",
    "Opening the heart to receive help and guidance from a higher power as understood personally.",
    "Choosing to believe that this higher power is a loving God who loves unconditionally despite human flaws.",
    "Offering oneself fully to the higher power to be shaped and used according to its will.",
    "Asking to be freed from self-imposed limitations and the prison of ego.",
    "Requesting that personal difficulties be removed or transformed so that victory over them can serve as testimony to others.",
    "Expressing a sincere wish always to do the higher power’s will.",
    "Surrendering the day, actions, thoughts, speech, and attitudes to divine guidance moment by moment.",
    "Choosing to be a channel of the higher power’s abundance and love in the world each day.",
    "Acknowledging past failures in managing life alone, and the inability to find peace through self-will.",
    "Readiness to relinquish control and ‘hand over the reins’ to the higher power as personally understood.",
    "Asking to feel safe and guided on the path chosen by the higher power.",
    "Seeking strength, courage, and wisdom to live according to divine will rather than selfish, immature desires.",
    "Requesting help to release fears, control, and barriers that block connection with the higher power.",
    "Commitment to walk hand-in-hand in trust and partnership with the higher power through recovery and life."
  ],
  4: [
    "Courageously and honestly facing oneself without judgment or shame.",
    "Seeking divine help to conduct a thorough, fearless, and uncompromising moral inventory.",
    "Seeing one’s strengths and weaknesses, light and shadow, clearly and with compassion.",
    "Recognizing how hidden fears, resentments, and motives influence thoughts, feelings, and behaviors.",
    "Gaining courage to confront the less pleasant parts of oneself—including selfishness, dishonesty, and harmful patterns.",
    "Accepting responsibility for the pain caused to oneself and others.",
    "Cultivating willingness to release the past and live in the present.",
    "Praying for clarity, honesty, and the ability to document the inventory clearly and fully.",
    "Bringing to light specific resentments, naming those involved, and acknowledging related pain and bitterness.",
    "Asking for help to see others with a clean heart and mind, and to release anger and grudges.",
    "Seeking blessing, peace, and wellbeing for those who have caused pain, as well as for oneself.",
    "Committing to forgiveness as a path to freedom and emotional healing.",
    "Trusting in a higher power to heal painful emotions and to give strength to accept the past.",
    "Choosing to move forward with an open and free heart."
  ],
};

export const SA_STEP_CITATIONS: Record<string, string[]> = {
  en: [
    "We admitted we were powerless over addictive sexual behavior – that our lives had become unmanageable.",
    "Came to believe that a Power greater than ourselves could restore us to sanity.",
    "Made a decision to turn our will and our lives over to the care of God as we understood Him.",
    "Made a searching and fearless moral inventory of ourselves.",
    "Admitted to God, to ourselves, and to another human being the exact nature of our wrongs.",
    "Were entirely ready to have God remove all these defects of character.",
    "Humbly asked Him to remove our shortcomings.",
    "Made a list of all persons we had harmed and became willing to make amends to them all.",
    "Made direct amends to such people wherever possible, except when to do so would injure them or others.",
    "Continued to take personal inventory and when we were wrong promptly admitted it.",
    "Sought through prayer and meditation to improve our conscious contact with God as we understood Him, praying only for knowledge of His will for us and the power to carry that out.",
    "Having had a spiritual awakening as the result of these steps, we tried to carry this message to addicts and to practice these principles in all our affairs."
  ],
  he: [
    "הודינו בעברינו כי אנחנו חסרי אונים מול ההתמכרות המינית – ושהחיים שלנו הפכו לבלתי ניתנים לניהול.",
    "האמנו שכוח עליון מאתנו יכול להשיב אותנו אל שפיות הדעת.",
    "החלטנו למסור את רצוננו וחיינו לטיפולו של אלוהים כשאנו מבינים אותו.",
    "ערכנו חשבון נפש יסודי וחסר פחד על עצמנו.",
    "הודינו לאלוהים, לעצמנו ולאדם אחר באופי המדויק של טעותינו.",
    "היינו מוכנים שכל חסרונות האופי שלנו יוסרו על ידי אלוהים.",
    "ביקשנו ממנו בענווה להסיר את חולשותינו.",
    "ערכנו רשימה של כל האנשים שפגענו בהם והסכמנו לתקן את מעשינו כלפיהם.",
    "תיקנו ישירות את הפגיעות שהסבנו, כל מקום שניתן, למעט כאשר הדבר עלול להזיק להם או לאחרים.",
    "המשכנו לבצע חשבון נפש אישי וכאשר טעינו הודינו מיד.",
    "חיפשנו בשאלות ותפילה לשפר את הקשר התודעתי שלנו עם אלוהים כפי שהבננו אותו, תוך בקשה רק לדעת את רצונו ולכוח לבצעו.",
    "לאחר שהגענו לתודעה רוחנית כתוצאה מהצעדים הללו, ניסינו להעביר מסר זה למכורים אחרים וליישם את עקרונות התכנית בכל תחומי חיינו."
  ]
};
