(function (g) {
  g.XFreezeMotionPromptLibrary = {
  "version": "1.2.0",
  "totalPrompts": 393,
  "totalCategories": 39,
  "groups": {
    "combos": {
      "name": "Best Combo Recipes",
      "tag": "COMBO"
    },
    "camera": {
      "name": "Camera techniques",
      "tag": "CAM"
    },
    "human": {
      "name": "Human & Expression",
      "tag": "HUM"
    },
    "atmosphere": {
      "name": "Light & Atmosphere",
      "tag": "ATM"
    },
    "vertical": {
      "name": "Industry & Scene",
      "tag": "SCN"
    },
    "premium": {
      "name": "Premium Transformations",
      "tag": "PREMIUM"
    }
  },
  "categories": [
    {
      "id": "best-combo-recipes",
      "num": 27,
      "name": "Best Combo Recipes",
      "shortName": "Recipes",
      "group": "combos",
      "icon": "fa-layer-group",
      "hue": 165,
      "desc": "Pre-merged camera + subject + style - paste-ready.",
      "intro": "Everything else in this library is a single building block - one camera technique, or one subject's motion. These are the finished combinations: camera + subject motion + style, already merged into one paste-ready prompt, for the most common real requests. Each one names which building-block categories it draws from, so you can see how it was built and make your own variations the same way.",
      "promptCount": 15,
      "prompts": [
        {
          "id": "portrait-hero-reveal",
          "title": "Portrait Hero Reveal",
          "text": "The camera performs a slow 360-degree orbit around the subject at a constant radius, beginning at a low angle looking slightly upward, then gradually rising to eye level as the orbit completes a quarter turn, before pushing into an extreme close-up on the skin and eyes that holds long enough for fine texture - pores, fine hair, natural sheen - to read clearly, with only a soft natural blink animating within the hold. Keep the orbit's speed and radius constant throughout, and do not let the skin texture smear, flatten, or resample into a plastic surface as the camera closes in.",
          "bestFor": "A single striking hero clip from one portrait photo - exactly the \"360 + low/high angle + skin texture\" combination people ask for most.",
          "builtFrom": "Camera Movement (orbit) + Camera Angles (low angle, extreme close-up) + Body Language (natural blink)"
        },
        {
          "id": "product-360-showcase",
          "title": "Product 360 Showcase",
          "text": "The camera orbits a full 360 degrees around the product at a constant height and distance, the surface catching a slow, continuous highlight sweep as a soft studio key light rotates in sync with the camera, before settling back at the starting angle with the light in its original position. Keep the rotation speed even throughout with no acceleration, and do not let reflections or highlights jump or flicker as they travel across the surface.",
          "bestFor": "A complete product page hero clip - one file, no assembly, ready for a listing or ad.",
          "builtFrom": "Camera Movement (orbit) + Lighting & Atmosphere (soft studio light shift) + Product & E-Commerce (rotating pedestal)"
        },
        {
          "id": "real-estate-twilight-walkthrough",
          "title": "Real Estate Twilight Walkthrough",
          "text": "Starting inside the main living space in the daylight of the source photo, the camera pans slowly and evenly across the room at a constant height, revealing the full layout, while the light outside any visible windows gradually deepens from daylight into a warm twilight blue, interior lights warming and brightening in step with the darkening sky by the end of the clip. Keep the pan speed constant and the architectural lines crisp throughout, and avoid any flicker as the interior and exterior light shift together.",
          "bestFor": "A single listing-video hero clip that does the room reveal and the mood-lighting transition in one shot.",
          "builtFrom": "Camera Angles (wide shot, interior pan) + Real Estate & Architecture (room reveal, twilight transition) + Lighting & Atmosphere (golden hour logic applied to dusk)"
        },
        {
          "id": "athletic-action-highlight",
          "title": "Athletic Action Highlight",
          "text": "Starting from a still, almost freeze-frame moment in the source photo, the athlete's wind-up motion builds explosively into the full action - the throw, swing, or jump - captured in genuine slow motion so the peak moment holds clearly on screen, camera performing a fast, controlled push-in that arrives tight on the moment of impact or release. Keep the slow-motion speed consistent through the whole action rather than ramping unevenly, and guard against limbs warping, duplicating, or losing correct joint proportions during the fastest part of the motion.",
          "bestFor": "A single dramatic highlight clip from one action photo, ready for a reel or highlight package.",
          "builtFrom": "Sports & Action (athletic wind-up, slow-motion impact) + Camera Movement (push-in)"
        },
        {
          "id": "fashion-runway-moment",
          "title": "Fashion Runway Moment",
          "text": "The subject begins in a static pose as photographed, then turns smoothly toward the camera as fabric and hair lift and settle naturally with the motion, a focused spotlight sweeping across them from one side as the turn completes, camera holding a fixed medium-close framing throughout. Keep the fabric and hair motion physically consistent with the turn's speed, and do not let a spotlight sweep flatten skin tones or fabric color as it passes.",
          "bestFor": "A single fashion or editorial clip combining subject motion, light, and a locked cinematic frame.",
          "builtFrom": "Fashion & Portrait (turn-to-camera, fabric/hair motion) + Music & Performance (spotlight sweep) + Camera Angles (medium shot)"
        },
        {
          "id": "nature-establishing-epic",
          "title": "Nature Establishing Epic",
          "text": "The camera pushes in slowly from a wide establishing view of the landscape, clouds streaking across the sky in time-lapse speed above it, the overall light gradually warming from neutral daylight into deep golden-hour tones as the push-in continues, arriving on a tighter framing of the most striking part of the scene by the end of the clip. Keep the push-in speed even and the cloud motion smooth without stutter, and do not let the color grade shift unevenly across different parts of the frame.",
          "bestFor": "A single sweeping landscape or travel establishing shot combining movement, time, and light in one clip.",
          "builtFrom": "Camera Movement (push-in) + Time-Lapse & Speed Effects (fast clouds) + Lighting & Atmosphere (golden hour transition)"
        },
        {
          "id": "pet-portrait-come-to-life",
          "title": "Pet Portrait Come to Life",
          "text": "Starting on a close, steady framing of the pet exactly as photographed, the ears lift and rotate slightly forward as if catching a sound, the tail (if visible) beginning a loose, relaxed wag, with one natural blink completing the sense of a living moment, camera holding its frame with no movement of its own. Guard against a second tail, extra ear, or duplicated paw appearing at the edges of the motion, and keep the wag rhythm loose and organic rather than mechanical.",
          "bestFor": "Turning a single pet photo into a warm, alive-feeling clip without needing to combine files yourself.",
          "builtFrom": "Camera Angles (close-up, locked frame) + Pet & Animal Motion (ear perk, tail wag)"
        },
        {
          "id": "automotive-hero-reveal",
          "title": "Automotive Hero Reveal",
          "text": "The camera starts at a low angle beside the vehicle, then arcs in a slow 360-degree orbit around it at a constant low height, the headlights igniting partway through the orbit as the light catches each new angle of the bodywork, completing back at the starting position with the lights now fully lit. Keep the orbit's speed constant and the low vantage held throughout, and do not let the headlight ignition strobe or the bodywork's reflections warp as the angle changes.",
          "bestFor": "A single dealership or brand hero clip combining angle, movement, and a lighting beat.",
          "builtFrom": "Camera Angles (low angle) + Camera Movement (orbit) + Automotive (headlight ignition glow)"
        },
        {
          "id": "food-macro-delight",
          "title": "Food Macro Delight",
          "text": "Starting on an extreme close-up filling the frame with the dish's texture, steam begins rising from the hot surface in soft, wavering wisps, and a thin stream of sauce or garnish falls into frame from above, landing naturally on the dish by the end of the clip. Keep the camera itself completely locked throughout, and do not let the steam strobe or the falling ingredient teleport rather than travel continuously into frame.",
          "bestFor": "A single food-hero clip for a menu, ad, or social post, texture and motion combined in one shot.",
          "builtFrom": "Camera Angles (extreme close-up) + Food & Culinary (steam rising, ingredient falling)"
        },
        {
          "id": "wedding-emotional-moment",
          "title": "Wedding Emotional Moment",
          "text": "Starting on a close, steady frame of the subject's face, the expression softens gradually from composed to tender, eyes warming as a slow, subtle smile begins to form, while the surrounding light shifts almost imperceptibly warmer, as if a nearby soft key light has been gently repositioned. Keep the expression change slow and natural rather than mechanical, and do not let the light shift cause any exposure jump or flatten shadow detail on the face.",
          "bestFor": "A single emotional beat clip - a first look, a vow moment, a quiet reaction - combining expression and light in one shot.",
          "builtFrom": "Camera Angles (close-up) + Facial Emotion (tender affection, softening gaze) + Lighting (soft studio light shift)"
        },
        {
          "id": "corporate-confident-portrait",
          "title": "Corporate Confident Portrait",
          "text": "The subject begins standing still in a medium frame, then takes one confident step toward the camera as their posture straightens slightly, office life continuing subtly in the background - a monitor's glow shifting, a distant figure passing - while the camera holds its position with only a very slow, almost imperceptible push-in. Keep the step small and grounded rather than a full walk-through-frame, and do not let the background figures' motion desynchronize or loop obviously.",
          "bestFor": "A confident, professional single-clip portrait for a bio page, LinkedIn, or about page.",
          "builtFrom": "Camera Angles (medium shot) + Corporate & Business (walk-in entrance, office ambience) + Camera Movement (subtle push-in)"
        },
        {
          "id": "drone-landscape-reveal",
          "title": "Drone Landscape Reveal",
          "text": "The camera rises smoothly and steadily from just above ground level, ascending to reveal the full scale of the landscape below as clouds drift steadily across the sky, the overall light warming gradually into golden-hour tones as the ascent completes. Keep the rise speed constant with no jitter, and do not let the horizon tilt or the cloud motion stutter as more of the scene enters frame.",
          "bestFor": "A single sweeping aerial establishing clip for travel, real estate, or brand landscape content.",
          "builtFrom": "Drone & Aerial (rising reveal) + Time-Lapse (moving clouds) + Lighting (golden hour transition)"
        },
        {
          "id": "beauty-product-glam-shot",
          "title": "Beauty Product Glam Shot",
          "text": "The product rotates slowly while gently levitating in place, catching a soft, continuously shifting studio highlight as it turns, before the camera pushes into an extreme close-up on the product's texture or cap detail as the rotation completes. Keep the levitating rotation smooth and weightless-looking throughout, and do not let the highlight sweep flatten the product's true color as it passes.",
          "bestFor": "A single premium beauty or cosmetics product clip combining motion, light, and a macro detail beat.",
          "builtFrom": "Product & E-Commerce (levitating rotation) + Camera Angles (extreme close-up) + Lighting (soft studio light shift)"
        },
        {
          "id": "fitness-motivation-clip",
          "title": "Fitness Motivation Clip",
          "text": "The camera holds a low, empowering angle as the subject completes one full rep of a lifting or pressing motion, jaw set and expression reading focused determination throughout the effort, settling into a brief exhale of release as the rep completes. Keep the rep's tempo natural and effortful rather than mechanical, and guard against the limbs merging or warping at the point of greatest exertion.",
          "bestFor": "A single motivational training clip combining a powerful angle, real effort, and expression in one shot.",
          "builtFrom": "Camera Angles (low angle) + Fitness & Wellness (workout rep motion) + Facial Emotion (serious to determined)"
        },
        {
          "id": "travel-postcard-moment",
          "title": "Travel Postcard Moment",
          "text": "The camera pans slowly across the scenic vista as clouds drift in gentle time-lapse motion above, the light warming steadily toward golden hour, before settling on a framing that could open or close a travel piece. Keep the pan speed even and the cloud motion smooth, and do not let the color grade shift unevenly across the frame as the light warms.\n\n---\n\n## How to build your own combo\n\nEvery recipe above follows the same pattern: **one camera prompt + one subject-motion prompt (if the subject moves) + one style/light prompt (if you want a mood shift)**, merged into a single flowing instruction rather than three separate pasted blocks. To build your own:\n\n1. Pick a camera prompt from `01`, `02`, or `03` that matches the angle/movement you want.\n2. Pick a subject-motion prompt from whichever category matches what's actually in your photo (`04`/`05` for people, `10` for products, `18` for animals, etc.) - skip this step entirely if you want the camera to be the only thing that moves.\n3. Optionally add one line from `06` (lighting), `07` (time-lapse), or `23` (weather/sky) for mood.\n4. Combine them into one paragraph, keeping only one \"start state\" and one \"end state\" for the whole clip rather than describing three separate timelines.",
          "bestFor": "A single, ready-to-use scenic establishing clip for travel content, without combining separate prompts yourself.",
          "builtFrom": "Camera Movement (pan) + Time-Lapse (cloud motion) + Lighting (golden hour transition)"
        }
      ],
      "suitableFor": "A single striking hero clip from one portrait photo - exactly the \"360 + low/high angle + skin texture\" combination people ask for most.; A complete product…"
    },
    {
      "id": "camera-angles-framing",
      "num": 1,
      "name": "Camera Angles & Framing",
      "shortName": "Angles",
      "group": "camera",
      "icon": "fa-video",
      "hue": 195,
      "desc": "Close-up, wide, POV, dutch tilt - subject-agnostic framing.",
      "intro": "These prompts define a specific camera angle or framing style - pure camera behavior, with no assumptions about what's actually in your photo. They work on a portrait, a product, a building, or a landscape equally, because the motion described belongs to the *camera*, not to a person's body. If you want the subject itself to also move (a face changing expression, a product rotating, an animal's ears perking), pair one of these with a prompt from the matching subject-motion category - see `INDEX.md` for how to combine them.",
      "promptCount": 13,
      "prompts": [
        {
          "id": "extreme-close-up-texture-reveal",
          "title": "Extreme Close-Up: Texture Reveal",
          "text": "Start framed as an extreme close-up, tight enough that the finest surface detail in the source image - skin, fabric, grain, metal, iris, foliage, whatever the frame is filled with - reads clearly. Hold the framing essentially locked, with only a faint, slow breathing-like drift of focus. Do not let the camera zoom out or reframe wider, and do not let the surface texture smear, melt, or resample into a flat, plastic-looking surface.",
          "bestFor": "Intimate detail shots on any subject - portrait skin texture, product materials, fabric, or natural surfaces - where texture is the whole story. Pair with a subject-motion prompt (e.g. a subtle blink, a slow product rotation) if you want life inside the frame, not just the camera holding still."
        },
        {
          "id": "close-up-quiet-presence",
          "title": "Close-Up: Quiet Presence",
          "text": "Begin on a standard close-up, framed tightly around whatever the main subject of the source image is. Let the shot hold with the camera itself completely locked - no repositioning, no push, no pan. Avoid any warping of the subject's edges or fine detail, and do not let the background behind it shift or swim.",
          "bestFor": "Talking-head content, product hero shots, or calm, still introductions to any subject. This prompt alone yields a static-camera clip - combine it with a subject-motion prompt for any life within the frame."
        },
        {
          "id": "medium-shot-grounded-stance",
          "title": "Medium Shot: Grounded Stance",
          "text": "Frame the subject centered or off-center at a medium distance, filling roughly the middle third of the frame, with clear space around it on at least two sides. Keep the horizon line and framing edges completely fixed throughout the clip - no drift, no reposition. Guard against any edges of the subject merging into the background or losing definition as the shot holds.",
          "bestFor": "Everyday lifestyle shots, product context shots, or grounded portraits. Add a subject-motion prompt matched to what's actually in your photo (human, product, animal) for any movement beyond the locked frame."
        },
        {
          "id": "wide-shot-establishing-scale",
          "title": "Wide Shot: Establishing Scale",
          "text": "Start with the full environment visible and the main subject small within it, framed to show scale between subject and setting. Animate only ambient environmental motion - wind in trees, distant traffic, drifting clouds, shifting light - while the subject itself stays where it is unless you've added a separate subject-motion prompt. Do not let anything in frame teleport or pop between positions, and keep background elements from flickering frame to frame.",
          "bestFor": "Scene-setting openers for travel, real estate, product-in-context, or landscape content - anywhere you want to establish scale before a closer shot."
        },
        {
          "id": "over-the-shoulder-implied-foreground-background",
          "title": "Over-the-Shoulder: Implied Foreground/Background",
          "text": "Frame from behind and beside a soft, out-of-focus foreground element, looking past it toward a second subject or focal point sharply in focus in the background. Keep the foreground element stable and its blur consistent while the background stays the point of interest. Do not let the foreground sharpen or grow, and avoid any doubling or ghosting in the background subject.",
          "bestFor": "Two-subject or dialogue-implying scenes, negotiation moments, or any composition using a soft foreground frame to point at a background subject."
        },
        {
          "id": "low-angle-quiet-power",
          "title": "Low Angle: Quiet Power",
          "text": "Position the camera below the subject's centerline, looking up so the subject appears tall and dominant against the sky or ceiling above it. Hold this low vantage steady, or move it slowly closer along the same low line. Guard against the base of the subject warping as the camera moves, and prevent the horizon from tilting unintentionally.",
          "bestFor": "Hero shots on any subject that benefits from feeling powerful or dominant - a person, a building, a vehicle, a product on a pedestal."
        },
        {
          "id": "high-angle-overview",
          "title": "High Angle: Overview",
          "text": "Position the camera above the subject looking down, either steeply (a full overview) or at a moderate downward tilt. Hold the elevated position steady without drifting, or move it slowly to widen the visible area below. Do not allow the ground or surface plane beneath the subject to stretch or bend as the angle holds.",
          "bestFor": "Vulnerable or intimate framing, or wide-context overviews of a scene, workspace, or table setting - works on a person, a desk of objects, or a landscape."
        },
        {
          "id": "bird-s-eye-view-pure-overhead",
          "title": "Bird's Eye View: Pure Overhead",
          "text": "Frame directly overhead, looking straight down at the scene laid out like a map - a desk, a table setting, a person lying down, a courtyard. Keep the camera perfectly perpendicular to the ground throughout, with no perspective creep suggesting a tilt away from straight-down. Avoid object edges swimming or the flat plane warping at the frame's corners.",
          "bestFor": "Flat-lay product shots, top-down food or workspace content, or map-like scene reveals of any kind."
        },
        {
          "id": "worm-s-eye-view-ground-level-awe",
          "title": "Worm's Eye View: Ground-Level Awe",
          "text": "Frame from ground level looking almost straight up, with the subject towering overhead against the sky. Animate a slow vertical drift of clouds or light passing behind the subject, or hold the frame steady. Guard against the subject's vertical lines warping or bending, since extreme verticals are especially prone to distortion.",
          "bestFor": "Architecture reveals, towering trees, tall figures, or any subject where scale and height are the point."
        },
        {
          "id": "dutch-tilt-unease-building",
          "title": "Dutch Tilt: Unease Building",
          "text": "Start with the frame canted at a noticeable angle, horizon line diagonal, subject slightly off-balance in the composition. Hold the tilt steady, or let it very gradually increase by a few more degrees over the clip. Do not let the tilt correct itself or snap back to level mid-clip, which reads as a glitch rather than a deliberate style choice.",
          "bestFor": "Tension, unease, or stylized editorial moods on any subject - a person, an object, or an environment."
        },
        {
          "id": "pov-shot-first-person-immersion",
          "title": "POV Shot: First-Person Immersion",
          "text": "Frame as if the viewer's own eyes are the camera, looking toward whatever is ahead in the source image. Let the implied eyeline drift very slightly, as a real person's gaze naturally would, without any sudden reframing. If hands or an object are visible at the bottom of frame, guard against them warping in shape or proportion - a very common failure in first-person framing.",
          "bestFor": "Immersive storytelling, product-interaction demos, or tutorial-style content told from a first-person vantage."
        },
        {
          "id": "two-subject-frame-balanced-composition",
          "title": "Two-Subject Frame: Balanced Composition",
          "text": "Frame two elements side by side or facing each other, both fully visible and balanced in the composition with even space around each. Keep both elements' relative size and position stable throughout - neither should drift out of frame or overlap the other unnaturally. Do not let their proportions shift relative to each other as the shot holds or moves.",
          "bestFor": "Conversations, partnerships, comparisons, before/after pairings, or any composition built around two co-equal points of interest."
        },
        {
          "id": "profile-shot-silhouette-line",
          "title": "Profile Shot: Silhouette Line",
          "text": "Frame the subject in strict side profile, its outline forming a clean silhouette against the background. Hold the profile line steady, or move the camera slowly along the same lateral line without crossing to reveal the far side. Do not let the framing drift far enough to reveal the opposite side awkwardly clipping or double-exposing.",
          "bestFor": "Editorial portraits, product silhouettes, or any subject with a distinctive outline worth emphasizing."
        }
      ],
      "suitableFor": "Intimate detail shots on any subject - portrait skin texture, product materials, fabric, or natural surfaces - where texture is the whole story. Pair with a…"
    },
    {
      "id": "camera-movement",
      "num": 2,
      "name": "Camera Movement",
      "shortName": "Movement",
      "group": "camera",
      "icon": "fa-arrows-up-down-left-right",
      "hue": 205,
      "desc": "Push-in, pan, orbit, crane, rack focus - pure camera paths.",
      "intro": "These prompts describe how the \"camera\" travels through or around a still image once it's animated - pushing in, pulling back, panning, orbiting, and so on. Think of this category as the path the lens takes, independent of what the subject is doing.",
      "promptCount": 14,
      "prompts": [
        {
          "id": "slow-push-in-rising-focus",
          "title": "Slow Push-In: Rising Focus",
          "text": "Start on a medium or wide framing of the subject with normal lens compression. Move the camera forward at a slow, steady, linear rate toward the subject's face or a key focal point, arriving at a tighter close-up by the end of the clip without ever accelerating or jerking. Do not let the push overshoot into the subject or cause facial features to stretch as the frame tightens.",
          "bestFor": "Building emotional emphasis, drawing attention to a reveal, dramatic openers."
        },
        {
          "id": "pull-out-dolly-out-context-reveal",
          "title": "Pull-Out / Dolly-Out: Context Reveal",
          "text": "Start tightly framed on a close-up detail (a face, an object, a hand), then move the camera steadily backward at an even rate to reveal the wider environment around the subject. Keep the backward motion smooth and constant with no pausing or stuttering partway through. Guard against the newly revealed background warping or generating inconsistent geometry as more of the scene comes into view.",
          "bestFor": "\"Bigger picture\" reveals, comedic or dramatic re-contextualization, scene-scale reveals."
        },
        {
          "id": "pan-left-following-the-line",
          "title": "Pan Left: Following the Line",
          "text": "Begin with the subject or a starting focal point on the right side of frame. Rotate the camera horizontally to the left at a smooth, even angular speed, ending with the subject on the left side of frame or a new focal point revealed. Do not let vertical elements (door frames, poles, bodies) bend or bow as the pan crosses them.",
          "bestFor": "Revealing what's beside the subject, following a gesture or gaze direction."
        },
        {
          "id": "pan-right-scanning-reveal",
          "title": "Pan Right: Scanning Reveal",
          "text": "Begin with the frame centered on an empty or secondary part of the scene, subject at the left edge. Rotate the camera horizontally to the right at a constant rate, sweeping across the scene until the subject or key detail settles into the frame. Keep the horizon level throughout the pan and avoid any sudden speed changes that would look like a jump cut disguised as a pan.",
          "bestFor": "Slow scene-setting reveals, moving from environment to subject."
        },
        {
          "id": "tilt-up-rising-reveal",
          "title": "Tilt Up: Rising Reveal",
          "text": "Start framed low, on the subject's feet, base of an object, or the ground. Move the camera vertically upward at a smooth even rate, revealing more of the subject or structure until settling on the face or top of the subject. Do not let the subject's proportions stretch vertically as the tilt progresses, and avoid any horizontal drift sneaking into what should be a pure vertical move.",
          "bestFor": "Dramatic character reveals, building height and stature, architecture reveals."
        },
        {
          "id": "tilt-down-grounding-reveal",
          "title": "Tilt Down: Grounding Reveal",
          "text": "Start framed high, on the subject's face or the top of a structure. Move the camera vertically downward at an even rate to reveal the lower body, hands, or base of the scene. Keep the motion purely vertical with no lateral sway, and prevent the ground plane at the bottom of frame from swimming or re-rendering oddly as it comes into view.",
          "bestFor": "Revealing an action happening in someone's hands, or grounding a tall subject."
        },
        {
          "id": "orbit-arc-shot-dimensional-reveal",
          "title": "Orbit / Arc Shot: Dimensional Reveal",
          "text": "Frame the subject centered, then move the camera along a smooth arcing path partway around them (roughly 30-45 degrees), keeping the subject centered in frame throughout as if circling them. Maintain a constant radius and speed so the subject doesn't grow or shrink mid-orbit. Guard against the subject's far side warping or generating incorrect anatomy as the camera reveals a new angle of them.",
          "bestFor": "Hero product shots, character introductions, giving a flat photo a sense of 3D depth."
        },
        {
          "id": "tracking-shot-parallel-follow",
          "title": "Tracking Shot: Parallel Follow",
          "text": "Frame the subject mid-stride or mid-motion, camera positioned to their side. Move the camera laterally at the same speed and direction as the subject's movement, keeping them at a consistent position in frame while the background streaks past behind them. Do not let the subject's pace and the camera's pace drift out of sync, which causes a sliding or moonwalking artifact.",
          "bestFor": "Walking or running sequences, action-adjacent lifestyle content."
        },
        {
          "id": "crane-up-ascending-departure",
          "title": "Crane Up: Ascending Departure",
          "text": "Start at the subject's eye level, close or medium framing. Move the camera upward and slightly backward in one continuous motion, rising above the subject until the shot becomes a high, wide overview of the scene. Keep the ascent smooth and gradually decelerating near the end rather than stopping abruptly. Avoid ground-plane distortion as more of the environment enters frame from below.",
          "bestFor": "Emotional endings, \"zooming out on life\" montage closers, scene transitions."
        },
        {
          "id": "crane-down-descending-arrival",
          "title": "Crane Down: Descending Arrival",
          "text": "Start high and wide, looking down over the full scene. Move the camera downward and slightly forward in one continuous motion, descending until it settles at eye level on the subject in a medium close-up. Keep the descent smooth with a gentle ease-out as it approaches final framing. Do not let the subject snap or pop into sharper detail abruptly - resolution should build gradually as the camera nears.",
          "bestFor": "Scene openers, \"arriving into a moment\" introductions."
        },
        {
          "id": "rack-focus-attention-shift",
          "title": "Rack Focus: Attention Shift",
          "text": "Frame two planes of depth - a foreground element and a background subject, both visible in the starting frame. Shift focus smoothly from sharp-foreground/soft-background to soft-foreground/sharp-background (or the reverse), without moving the camera position at all. Keep the transition gradual and continuous, and avoid any sudden double-focus glitches where both planes flicker between sharp and blurry.",
          "bestFor": "Redirecting viewer attention from an object to a person (or vice versa) without cutting."
        },
        {
          "id": "whip-pan-energetic-snap",
          "title": "Whip Pan: Energetic Snap",
          "text": "Begin on a static starting frame. Execute a fast horizontal camera rotation that blurs the middle of the motion into streaking motion blur, then settle cleanly onto a new framing at the end. Keep the start and end frames crisp and stable, with the blur concentrated only in the middle portion of the move. Guard against the final settled frame retaining leftover blur or jitter after the whip completes.",
          "bestFor": "Energetic transitions, reveals with impact, action or sports-style content."
        },
        {
          "id": "dolly-zoom-vertigo-effect",
          "title": "Dolly Zoom: Vertigo Effect",
          "text": "Start with the subject centered at a normal framing with natural-looking background proportions. Simultaneously move the camera backward while narrowing the field of view (or forward while widening it), so the subject's size in frame stays constant while the background visibly compresses or stretches around them. Keep the subject's own proportions stable throughout and confine the warping effect to the background only, since this shot is prone to distorting the subject's face if not isolated correctly.",
          "bestFor": "Disorientation, realization, or shock moments - the classic \"vertigo\" reaction shot."
        },
        {
          "id": "static-lock-off-with-depth-drift",
          "title": "Static Lock-Off with Depth Drift",
          "text": "Keep the camera position completely fixed as if mounted on a tripod, with no panning, tilting, or dollying at all. Animate only atmospheric depth cues - falling snow, drifting dust motes, steam, or shifting light - passing between the camera and the subject to create a sense of layered depth. Do not let the \"locked\" camera introduce any drift or micro-zoom, since the entire effect depends on true stillness.",
          "bestFor": "Contemplative, still moments where you want depth and atmosphere without literal camera motion."
        }
      ],
      "suitableFor": "Building emotional emphasis, drawing attention to a reveal, dramatic openers.; \"Bigger picture\" reveals, comedic or dramatic re-contextualization,…"
    },
    {
      "id": "handheld-natural-motion",
      "num": 3,
      "name": "Handheld & Natural Motion",
      "shortName": "Handheld",
      "group": "camera",
      "icon": "fa-hand",
      "hue": 215,
      "desc": "Handheld sway, walk bounce, steadicam float, vlog hold.",
      "intro": "These prompts add the small imperfections of a human-operated camera - sway, bounce, breathing - to make a clip feel like it was shot by a person holding a device, not a locked-off robot. Use them when you want authenticity and rawness over polished, stable cinematography.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "subtle-handheld-sway",
          "title": "Subtle Handheld Sway",
          "text": "Start on a steady medium framing of the subject. Introduce a gentle, irregular drift of the frame in small circular and diagonal increments, as if held in two hands without a stabilizer, never moving more than a small fraction of the frame width in any direction. Keep the sway continuous and organic rather than repeating in an obvious loop, and do not let the drift accumulate into a full pan or reposition the subject out of frame.",
          "bestFor": "Documentary-style or authentic social content that shouldn't feel too polished."
        },
        {
          "id": "walking-bounce-footstep-rhythm",
          "title": "Walking Bounce: Footstep Rhythm",
          "text": "Frame the subject or point-of-view as if the camera operator is walking forward. Animate a rhythmic vertical bounce synced to an implied footstep cadence, with a slightly heavier downward settle on each \"step\" and a softer rise between them. Keep the bounce rhythm consistent throughout rather than speeding up or slowing down erratically, and avoid the horizon line tipping side to side excessively, which reads as falling rather than walking.",
          "bestFor": "Walking POV shots, following-someone footage, casual vlog-style movement."
        },
        {
          "id": "breathing-motion-drift",
          "title": "Breathing-Motion Drift",
          "text": "Start on a close or medium shot with the camera essentially still. Add a slow, small rise-and-fall motion to the frame that mimics the rhythm of the operator's own breathing, roughly a few seconds per cycle, staying within a very tight range of vertical movement. Keep this motion smooth and sinusoidal rather than jittery, and do not let it drift the subject out of centered framing over time.",
          "bestFor": "Quiet intimate moments where total stillness would feel too clinical."
        },
        {
          "id": "run-and-gun-shake",
          "title": "Run-and-Gun Shake",
          "text": "Frame a fast-moving or urgent scene. Animate a higher-frequency, higher-amplitude shake in the frame, with quick small jolts in multiple directions as if the operator is moving quickly or reacting in real time. Cap the shake so the subject always remains recognizably in frame, and prevent the shake from becoming so extreme that facial features or edges blur into smears.",
          "bestFor": "Urgent, chaotic, or high-energy moments - breaking news style, action sequences."
        },
        {
          "id": "steadicam-smooth-float",
          "title": "Steadicam-Smooth Float",
          "text": "Start on a moving frame that glides forward or laterally with a slight, continuous floating quality - a small figure-eight micro-drift layered on top of the main movement direction. Keep the float smooth and weighted, like the camera has inertia, rather than sharp or twitchy. Do not let the floating drift overpower the primary direction of travel or cause the subject to leave frame.",
          "bestFor": "Polished-but-human movement - real estate walkthroughs, elegant lifestyle footage."
        },
        {
          "id": "shoulder-mounted-feel",
          "title": "Shoulder-Mounted Feel",
          "text": "Frame at chest-to-eye height as if the camera rests on the operator's shoulder. Animate a slow, weighty sway with a slightly heavier drift downward and to one side, mimicking the natural settle of a shoulder rig, punctuated by very occasional small corrective adjustments as if the operator is re-leveling. Keep corrections subtle and infrequent, and do not let the frame snap-correct suddenly, which breaks the illusion of physical weight.",
          "bestFor": "News-style or observational footage with a grounded, physical camera presence."
        },
        {
          "id": "vlogger-selfie-hold-motion",
          "title": "Vlogger Selfie-Hold Motion",
          "text": "Frame the subject close, arm's-length distance, as if they are holding the camera themselves and speaking to it. Animate a small natural wobble from the extended arm along with the subject's own head and shoulder movement as they talk, keeping their face reliably centered despite the wobble. Guard against the subject's arm (if visible at frame edge) warping in shape, and avoid extreme drift that would push their face out of frame.",
          "bestFor": "Direct-to-camera talking content, personal vlogs, casual testimonials."
        },
        {
          "id": "bicycle-vehicle-mount-vibration",
          "title": "Bicycle/Vehicle Mount Vibration",
          "text": "Frame a subject or point-of-view as if the camera is mounted on a moving bike or vehicle dashboard. Animate a fine, continuous high-frequency micro-vibration layered under a steady forward drift, simulating engine or road vibration rather than operator movement. Keep the vibration amplitude small and constant, and do not let it escalate into visible frame-doubling or ghosting artifacts.",
          "bestFor": "Travel content, commute footage, POV vehicle shots."
        },
        {
          "id": "handheld-settle-stopping-to-look",
          "title": "Handheld Settle: Stopping to Look",
          "text": "Start with a small ongoing handheld sway as if the operator was walking. Animate the sway gradually reducing in amplitude until the frame settles into near-stillness, as if the person stopped walking and is now holding steady to observe something. Keep the deceleration gradual and natural rather than an abrupt stop, and do not let the frame overshoot past its settle point and correct back.",
          "bestFor": "Transitional moments where movement resolves into a pause - arriving somewhere, noticing something."
        },
        {
          "id": "wind-buffeted-handheld",
          "title": "Wind-Buffeted Handheld",
          "text": "Frame an outdoor subject. Animate irregular, gust-like pushes to the frame - brief stronger jolts in one direction followed by a return toward center, as if wind is intermittently pushing the camera operator. Vary the timing of the gusts so they don't feel rhythmic or looped, and prevent the subject's hair or clothing motion (if present) from desyncing from the implied wind direction.",
          "bestFor": "Outdoor, weather-exposed scenes - beaches, mountaintops, storm-adjacent content."
        },
        {
          "id": "crouch-to-stand-handheld-rise",
          "title": "Crouch-to-Stand Handheld Rise",
          "text": "Start framed lower, as if the operator is crouched or seated, camera at a lower height with a subtle handheld sway. Animate the frame rising steadily in height over the clip, mimicking the operator standing up, while maintaining the same gentle sway throughout the rise. Keep the vertical rise smooth and continuous, and do not let the framing lose the subject or reframe abruptly partway through the rise.",
          "bestFor": "Point-of-view perspective shifts, transitions from a low observational shot to standing eye level."
        },
        {
          "id": "nervous-handheld-hesitation",
          "title": "Nervous Handheld Hesitation",
          "text": "Frame the subject in a tense or uncertain moment. Animate small, irregular starts and stops in the camera's drift - a slight movement toward the subject, a brief hesitation, then another small movement - mimicking an operator who is unsure whether to approach. Keep each micro-movement small and avoid letting the hesitation read as random jitter rather than intentional uncertainty; do not let the frame ever fully leave the subject.",
          "bestFor": "Suspenseful or emotionally uncertain scenes, horror-adjacent or tension-building content."
        }
      ],
      "suitableFor": "Documentary-style or authentic social content that shouldn't feel too polished.; Walking POV shots, following-someone footage, casual vlog-style movement."
    },
    {
      "id": "facial-emotion-expression",
      "num": 4,
      "name": "Facial Emotion & Expression",
      "shortName": "Facial",
      "group": "human",
      "icon": "fa-face-smile",
      "hue": 330,
      "desc": "Believable expression transitions for portraits.",
      "intro": "These prompts animate a still portrait by moving the face through a specific, believable emotional transition - from one expression state to another - rather than a generic \"person moves\" instruction. They cover a real emotional range, not just smiling, so pick the register that matches the mood you need.",
      "promptCount": 14,
      "prompts": [
        {
          "id": "neutral-to-joyful-smile-forming",
          "title": "Neutral to Joyful: Smile Forming",
          "text": "Start with the subject's face in a relaxed, neutral resting expression, lips closed and eyes calm. Animate the corners of the mouth lifting gradually, cheeks rising, and eyes softening into genuine crinkles at the corners as the smile builds to completion over the course of the clip. Keep the progression gradual and asymmetric-natural rather than a symmetrical mechanical lift, and do not let the teeth or mouth shape glitch or double-render mid-transition.",
          "bestFor": "Warm brand moments, testimonials, positive reveals."
        },
        {
          "id": "eyes-widening-in-surprise",
          "title": "Eyes Widening in Surprise",
          "text": "Start with the subject's face in a neutral or mildly curious state. Animate the eyebrows lifting sharply, eyes widening with visible white showing above the iris, and the mouth parting slightly open, all happening within a quick beat rather than gradually. Hold the surprised expression briefly at the peak rather than snapping back to neutral immediately. Guard against the eyebrows or eyelids warping or the eyes becoming asymmetric in size during the widen.",
          "bestFor": "Reaction shots, reveal moments, unboxing or gift-reaction content."
        },
        {
          "id": "brow-furrowing-in-concentration",
          "title": "Brow Furrowing in Concentration",
          "text": "Start with the subject's face relaxed and forward-facing. Animate the brow drawing inward and slightly downward, a faint vertical crease forming between the eyebrows, and the eyes narrowing slightly as if focusing intently on something close at hand. Keep the change subtle and slow, mirroring real focus rather than anger, and do not let the forehead skin ripple or distort unnaturally as the crease forms.",
          "bestFor": "Studying, problem-solving, or skilled-work moments - someone absorbed in a task."
        },
        {
          "id": "calm-to-alarmed",
          "title": "Calm to Alarmed",
          "text": "Start with the subject in a composed, neutral expression, breathing calm. Animate a rapid shift where the eyes dart and widen, breathing becomes visibly shallower and faster in the chest and shoulders, and the mouth tightens into a tense line, as if they've just noticed something wrong. Keep the transition fast but not instantaneous - a beat of realization before full alarm. Do not let the face freeze mid-transition or let the eyes lose tracking/alignment with each other.",
          "bestFor": "Suspense, warning moments, dramatic tension builds."
        },
        {
          "id": "contemplative-gaze-shift",
          "title": "Contemplative Gaze Shift",
          "text": "Start with the subject looking directly at the camera. Animate the eyes drifting slowly off to one side and slightly upward or downward, as if a thought has just occurred to them, with the head following the gaze by only a few degrees. Keep the movement slow and unhurried, eyelids relaxing slightly. Do not let the pupils or iris detach visually from the eye socket during the shift, a common artifact in slow gaze changes.",
          "bestFor": "Reflective voiceover moments, storytelling pauses, \"lost in thought\" beats."
        },
        {
          "id": "laughing-naturally",
          "title": "Laughing Naturally",
          "text": "Start with the subject already mid-smile or neutral. Animate the smile opening further into a laugh - head tilting back very slightly, shoulders lifting in a small implied chuckle motion, eyes narrowing with genuine crinkle lines, and the mouth opening naturally to show upper teeth. Keep the motion loose and slightly irregular like a real laugh rather than a perfect symmetrical loop, and guard against the mouth interior or teeth glitching as it opens wider than a smile.",
          "bestFor": "Candid joyful moments, genuine reactions, warmth-driven brand content."
        },
        {
          "id": "single-tear-emotional-welling",
          "title": "Single Tear / Emotional Welling",
          "text": "Start with the subject's eyes glassy but composed, expression otherwise still. Animate the eyes welling further until a single tear forms at the lower lash line and slowly releases, tracking down the cheek at a natural, gravity-consistent pace, while the mouth trembles almost imperceptibly. Keep the rest of the face still and controlled so the tear reads as restrained emotion, not a breakdown. Do not let the tear track disappear or reappear inconsistently, and avoid unnatural skin shimmer around the eyes.",
          "bestFor": "Emotional storytelling, gratitude moments, quietly powerful testimonials."
        },
        {
          "id": "confident-smirk-forming",
          "title": "Confident Smirk Forming",
          "text": "Start with the subject's face neutral or mildly serious. Animate one corner of the mouth lifting slightly higher than the other, forming an asymmetric half-smile, paired with a subtle narrowing of the eyes and a slight lift of the chin. Keep the asymmetry intentional and controlled, holding at the smirk rather than progressing into a full smile. Do not let the asymmetry over-distort into a lopsided or warped mouth shape.",
          "bestFor": "Confident brand personas, playful teases, \"I know something you don't\" moments."
        },
        {
          "id": "subtle-skepticism-raised-eyebrow",
          "title": "Subtle Skepticism: Raised Eyebrow",
          "text": "Start with the subject's face neutral, looking toward the camera or a middle-distance point. Animate a single eyebrow lifting slightly higher than the other while the mouth presses into a faint, closed-lip line and the head tilts a few degrees to one side. Keep the movement small and restrained - this is doubt, not shock. Guard against both eyebrows accidentally lifting in sync, which erases the intended asymmetry, and avoid any eye misalignment.",
          "bestFor": "Skeptical reactions, comedic doubt beats, \"really?\" moments."
        },
        {
          "id": "serious-to-determined",
          "title": "Serious to Determined",
          "text": "Start with the subject's face calm and unreadable. Animate the jaw setting slightly firmer, eyes narrowing with focused intensity, and the gaze sharpening directly toward camera or a fixed point ahead, as if resolve is settling in. Keep the transition measured and weighty rather than fast, allowing a beat before the determined expression fully locks in. Do not let the jawline or cheekbones warp as the muscles tighten.",
          "bestFor": "Motivational content, before-a-challenge moments, empowerment narratives."
        },
        {
          "id": "tender-affection-softening-gaze",
          "title": "Tender Affection: Softening Gaze",
          "text": "Start with the subject's expression neutral or mildly composed. Animate the eyes softening, eyelids relaxing slightly lower, and a faint, closed-mouth smile emerging along with a gentle tilt of the head toward the implied subject of their affection (a person, child, or pet just off-frame). Keep the motion slow and warm. Do not let the head tilt so far that it pulls the face out of a flattering three-quarter angle or clips the frame edge.",
          "bestFor": "Parenting content, romantic moments, gentle relationship-driven storytelling."
        },
        {
          "id": "curious-head-tilt",
          "title": "Curious Head Tilt",
          "text": "Start with the subject looking straight ahead, neutral expression. Animate the head tilting to one side by a small, natural degree while the eyebrows lift slightly and the eyes widen just a touch, as if something unexpected has caught their attention. Keep the tilt gentle and grounded at the neck rather than exaggerated, and do not let the ears or hairline distort as the head rotates.",
          "bestFor": "Curiosity-driven reveals, product-first-look reactions, playful engagement shots."
        },
        {
          "id": "anxious-lip-press",
          "title": "Anxious Lip Press",
          "text": "Start with the subject's mouth relaxed and neutral. Animate the lips slowly pressing together and slightly inward, the throat showing a small nervous swallow, and the eyes flicking briefly downward before returning to the camera. Keep the motion subdued and internalized rather than exaggerated, reflecting suppressed nervousness. Do not let the mouth shape collapse or distort unnaturally during the press.",
          "bestFor": "Nervous anticipation, waiting-for-news moments, quiet tension beats."
        },
        {
          "id": "joyful-to-composed-settling-down",
          "title": "Joyful to Composed: Settling Down",
          "text": "Start with the subject mid-laugh or mid-smile, animated and expressive. Animate the expression gradually settling - the smile easing back to a soft, closed-mouth version, breathing slowing, eyes calming from crinkled to relaxed - ending on a warm but composed neutral. Keep the de-escalation gradual and smooth rather than an abrupt cut to stillness. Do not let residual motion (like a lingering laugh shake) continue after the face has otherwise settled, which reads as a desync glitch.",
          "bestFor": "Closing beats after a joyful moment, outro shots, calming resolution after energy."
        }
      ],
      "suitableFor": "Warm brand moments, testimonials, positive reveals.; Reaction shots, reveal moments, unboxing or gift-reaction content."
    },
    {
      "id": "body-language-natural-movement",
      "num": 5,
      "name": "Body Language & Natural Movement",
      "shortName": "Body",
      "group": "human",
      "icon": "fa-person-walking",
      "hue": 340,
      "desc": "Head tilts, blinks, weight shifts, fabric sway.",
      "intro": "Prompts for turning a still photo of a person into a short clip of subtle, believable human motion - the small, real-feeling gestures that make a portrait or lifestyle photo feel alive instead of animated or fake.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "slow-head-tilt-toward-camera",
          "title": "Slow Head Tilt Toward Camera",
          "text": "The subject begins with their head held level and gaze forward, then tilts their head slowly toward one shoulder over the course of the clip, settling into a relaxed, slightly curious angle by the end. The motion should be a single smooth rotation on the neck, not a repeated bobbing, with the shoulders and torso staying still throughout. Do not let the facial features distort or the eyes drift out of alignment as the head turns; keep proportions locked and the motion slow enough to avoid any jittery stepping.",
          "bestFor": "Portrait headshots or profile photos where you want a warm, personable \"coming to life\" feel."
        },
        {
          "id": "natural-eye-blink-cycle",
          "title": "Natural Eye Blink Cycle",
          "text": "Starting from the subject's eyes open in the source image, introduce one or two natural, unhurried blinks spaced a couple seconds apart, each blink closing and reopening smoothly without freezing mid-motion. Everything else in the frame - hair, background, posture - stays completely static so the blink reads as the sole point of motion. Avoid any flickering of the eyelids or asymmetric blinking where one eye lags behind the other, and do not let the eye shape or iris warp during the close.",
          "bestFor": "Making a static headshot or ID-style photo feel like a live moment rather than a frozen image."
        },
        {
          "id": "hair-lifting-in-a-light-breeze",
          "title": "Hair Lifting in a Light Breeze",
          "text": "Beginning with hair resting in its photographed position, introduce a gentle, intermittent breeze that lifts and settles loose strands and flyaways in soft waves, with the ends drifting slightly before falling back into a resting state by the final frame. The movement should ripple naturally from root to tip rather than moving as one rigid block. Keep the motion gentle and avoid any sudden gusts, and do not let strands merge, disappear, or clip through the face or shoulders during the drift.",
          "bestFor": "Outdoor portraits or fashion shots where wind can add atmosphere without changing the pose."
        },
        {
          "id": "clothing-fabric-sway-in-wind",
          "title": "Clothing Fabric Sway in Wind",
          "text": "Starting from the still fabric in the source photo, add a light, irregular wind that causes loose clothing - a scarf, jacket hem, or loose sleeve - to ripple and sway outward and back over the duration of the clip, as though caught in real intermittent gusts. The fabric should move independently from the body underneath it, settling back to a near-original drape by the end. Guard against the fabric warping into unnatural shapes or merging with the body silhouette, and avoid any abrupt snapping motion that looks mechanical.",
          "bestFor": "Fashion, editorial, or outdoor lifestyle photos with flowing garments."
        },
        {
          "id": "subtle-weight-shift-from-one-foot-to-the-other",
          "title": "Subtle Weight Shift From One Foot to the Other",
          "text": "The subject starts standing with weight evenly distributed, then gradually shifts their weight onto one hip and leg, causing a slight, natural sway in the shoulders and a small dip in the opposite hip, before easing back toward center by the end of the clip. The shift should read as one continuous, relaxed movement rather than a repeated rocking loop. Do not let the legs or hips distort during the weight transfer, and avoid any sliding-foot artifacts where the feet appear to glide across the ground instead of pivoting naturally.",
          "bestFor": "Standing full-body or three-quarter shots where you want a casual, unposed feeling."
        },
        {
          "id": "idle-hand-fidget",
          "title": "Idle Hand Fidget",
          "text": "Beginning with hands resting in their photographed position, animate a small, idle gesture - fingers lightly tapping a surface, thumb brushing against a ring, or fingers loosely interlacing and releasing - that lasts the length of the clip and returns close to the starting hand position at the end. Keep the motion confined to the fingers and wrist, with the rest of the arm staying still. Avoid finger warping, extra or missing digits appearing mid-motion, and any teleporting where the hand jumps position between frames instead of moving continuously.",
          "bestFor": "Close-up or seated portraits where hands are visible and you want a natural, unscripted human detail."
        },
        {
          "id": "shoulders-releasing-tension",
          "title": "Shoulders Releasing Tension",
          "text": "The subject starts with shoulders slightly raised and tight, then exhales visibly as the shoulders drop and roll back into a relaxed, open posture over a few seconds, with the chest settling into a slower breathing rhythm by the end. This should read as one clear release, not a repeating loop. Keep the head and facial expression steady during the shift, and avoid any sudden jump in shoulder height or unnatural stretching of the neckline or collar as the posture changes.",
          "bestFor": "Wellness, therapy, or lifestyle brand photography aiming for a calming, human moment."
        },
        {
          "id": "turning-to-face-the-camera",
          "title": "Turning to Face the Camera",
          "text": "The subject begins in a three-quarter or profile pose looking off-frame, then rotates their head and upper body smoothly to face the camera directly, arriving at a natural, settled eye-line by the end of the clip. The rotation should be a single continuous arc at a steady, unhurried speed. Do not let the background warp or smear during the turn, and keep facial proportions consistent throughout rather than allowing features to distort as the angle changes.",
          "bestFor": "Editorial or profile photos where you want the reveal of a direct, confident gaze."
        },
        {
          "id": "leaning-in-toward-the-lens",
          "title": "Leaning In Toward the Lens",
          "text": "Starting from an upright seated or standing position with some distance from the camera, the subject leans forward gradually, shifting weight onto their forearms or shifting their torso closer to the lens, creating a subtle increase in perceived closeness and intimacy by the end of the clip. The lean should be slow and grounded, not a sudden lurch. Guard against perspective distortion warping the face or hands as they approach the camera, and avoid any jittery, stop-start motion during the lean.",
          "bestFor": "Interview-style portraits or confessional-tone content where increased intimacy suits the message."
        },
        {
          "id": "leaning-back-into-a-relaxed-posture",
          "title": "Leaning Back Into a Relaxed Posture",
          "text": "The subject begins upright and slightly forward, then eases back into a chair or wall behind them, settling into a loose, open, relaxed posture with one arm draping naturally by the end. The recline should be smooth and gravity-consistent, with fabric and hair reacting slightly to the movement. Avoid any clipping through the chair or wall behind the subject, and do not let the body proportions stretch or compress unnaturally during the recline.",
          "bestFor": "Casual lifestyle or brand photography meant to feel unguarded and at ease."
        },
        {
          "id": "naturally-crossing-the-arms",
          "title": "Naturally Crossing the Arms",
          "text": "Starting with arms at the subject's sides or loosely in front, animate one arm folding across the body followed by the other settling on top, arriving at a relaxed crossed-arm stance held for the remainder of the clip. The motion should follow a natural joint path at the shoulder and elbow, completing in under two seconds. Keep close attention on the hands and forearms to avoid finger warping or overlapping geometry where the arms cross, and avoid any snapping directly into the end pose without the intermediate motion.",
          "bestFor": "Confident portrait or fashion shots where a crossed-arm stance reads as assured rather than closed-off."
        },
        {
          "id": "quiet-weight-rock-while-standing",
          "title": "Quiet Weight Rock While Standing",
          "text": "The subject starts in a relaxed standing pose, then rocks gently forward onto the balls of the feet and back onto the heels in one soft, slow cycle, with arms and head remaining nearly still to keep focus on the subtle full-body sway. This should feel like idle, unconscious movement, not a deliberate action. Avoid any ground-plane sliding or floating where the feet lose contact with the surface, and keep the motion small enough that it doesn't read as bouncing.",
          "bestFor": "Casual full-length shots where you want gentle, lifelike idle motion without a specific gesture."
        }
      ],
      "suitableFor": "Portrait headshots or profile photos where you want a warm, personable \"coming to life\" feel.; Making a static headshot or ID-style photo feel like a live…"
    },
    {
      "id": "lighting-atmosphere-shifts",
      "num": 6,
      "name": "Lighting & Atmosphere Shifts",
      "shortName": "Lighting",
      "group": "atmosphere",
      "icon": "fa-sun",
      "hue": 38,
      "desc": "Golden hour, neon, fog, storm light - mood layers.",
      "intro": "Prompts for adding mood through changing light and air in a still photo - sunsets settling in, flames flickering, shadows drifting - so a static scene gains the quiet motion of real light changing over time.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "golden-hour-transition",
          "title": "Golden Hour Transition",
          "text": "The scene starts in the flat, neutral daylight of the source photo, then the light gradually warms into deep amber and gold tones as the sun angle appears to lower, with long soft shadows slowly stretching across the ground by the end of the clip. The color temperature shift should be gradual and continuous, not a sudden color swap. Keep the composition and object positions completely fixed during the transition, and avoid any exposure flicker or banding as the warmer tones take over.",
          "bestFor": "Turning a midday exterior photo into a warm, cinematic golden-hour mood shot."
        },
        {
          "id": "flickering-candlelight",
          "title": "Flickering Candlelight",
          "text": "Beginning with a lit candle or fire source glowing steadily, introduce natural, irregular flickering where the flame dances and dims and brightens slightly, casting a soft, shifting warm glow and moving shadow patterns on nearby surfaces. The flicker should feel organic and uneven, never a repeating loop with an obvious cycle. Avoid harsh strobing or sudden full-brightness jumps, and keep the flame's base position anchored so it doesn't drift or teleport across the wick.",
          "bestFor": "Cozy interior scenes, restaurant tablescapes, or romantic mood shots with visible flame."
        },
        {
          "id": "passing-cloud-shadow",
          "title": "Passing Cloud Shadow",
          "text": "The scene starts in even, bright sunlight, then a soft-edged shadow sweeps gradually across the ground and up any vertical surfaces as though cast by a cloud passing overhead, darkening the scene briefly before light returns to its original brightness by the end. The shadow's edge should be soft and its movement steady in one direction. Do not let the shadow snap on and off abruptly, and keep overall exposure consistent outside of the shadow's gradual pass so the rest of the image doesn't flicker.",
          "bestFor": "Exterior landscape or architectural photos needing a subtle, natural sense of time passing."
        },
        {
          "id": "lens-flare-sweep",
          "title": "Lens Flare Sweep",
          "text": "Starting from a clean, flare-free frame, a soft streak of lens flare enters from one edge of the frame and sweeps gradually across the image as though a light source such as the sun is shifting position just out of frame, fading back out by the end of the clip. The flare should move at a steady, consistent speed with soft, translucent edges. Avoid any harsh, static flare that just appears and disappears instantly, and don't let the flare distort or double the underlying image geometry as it passes.",
          "bestFor": "Adding a cinematic, dreamy quality to outdoor or backlit photos."
        },
        {
          "id": "soft-studio-light-shift",
          "title": "Soft Studio Light Shift",
          "text": "The scene begins under one soft, even studio light setup, then the key light gradually shifts angle and intensity, causing shadows on the subject's face or product to slowly rotate and soften or deepen slightly by the end of the frame. The change should be slow and continuous, mimicking a light being repositioned off-camera. Keep skin tones and material colors stable throughout, and avoid any sudden exposure jump or flattening of shadow detail as the light moves.",
          "bestFor": "Product photography or studio portraits where subtle light movement adds production value."
        },
        {
          "id": "moonlight-settling-in",
          "title": "Moonlight Settling In",
          "text": "Starting in the last light of dusk with a cool blue tone building, the scene gradually darkens and settles into a quiet moonlit ambiance, with a soft silver-blue glow picking out edges of objects and a faint haze suggesting night air by the end of the clip. The darkening should proceed smoothly and evenly across the frame. Avoid crushing the entire image to black or losing all shadow detail, and don't let colors shift unevenly across different parts of the frame during the transition.",
          "bestFor": "Turning a dusk exterior into a settled, atmospheric night scene."
        },
        {
          "id": "sunrise-breaking-through",
          "title": "Sunrise Breaking Through",
          "text": "The scene starts in dim, cool pre-dawn light, then a warm golden light gradually breaks across the horizon and spreads into the frame, brightening the scene and introducing soft warm highlights on the tops of objects while shadows remain long by the end of the clip. The light should spread gradually from one direction, not brighten uniformly all at once. Avoid any abrupt exposure pop when the \"sun\" appears, and keep the horizon line and object positions fixed throughout.",
          "bestFor": "Establishing shots meant to convey a fresh start or the beginning of a day."
        },
        {
          "id": "pulsing-neon-sign-glow",
          "title": "Pulsing Neon Sign Glow",
          "text": "Beginning with a neon sign lit at a steady brightness, introduce a slow, rhythmic pulse where the glow brightens and dims gently in a repeating cycle, with the colored light softly washing over nearby wet pavement or glass by the end of the clip. The pulse should be smooth and sine-like, never a hard on/off flicker. Avoid any color bleeding onto unrelated parts of the scene, and keep the sign's shape and text crisp rather than warping or smearing as it glows.",
          "bestFor": "Urban night scenes, bar or restaurant exteriors, and retro-styled advertising shots."
        },
        {
          "id": "fog-rolling-through-ambient-light",
          "title": "Fog Rolling Through Ambient Light",
          "text": "The scene starts clear, then a thin layer of fog or mist drifts slowly across the lower portion of the frame, softening background elements and scattering existing light sources into gentle halos before thinning back out by the end of the clip. The fog should move at a slow, even drift in one general direction. Avoid the fog appearing as a flat, static overlay, and don't let it obscure the main subject completely or cause background elements to warp behind it.",
          "bestFor": "Moody landscape, forest, or early-morning urban photos needing atmospheric depth."
        },
        {
          "id": "sunlight-through-window-blinds",
          "title": "Sunlight Through Window Blinds",
          "text": "Starting with even ambient light in an interior space, animate soft bars of sunlight gradually shifting position across the floor and nearby walls, as though the sun is moving outside a blinded window, growing slightly warmer in tone by the end of the clip. The light bars should move smoothly and stay geometrically straight and parallel. Avoid the light patterns warping around furniture edges unnaturally, and keep the overall room brightness from jumping suddenly between frames.",
          "bestFor": "Interior lifestyle shots wanting a slow, warm passage-of-time feeling."
        },
        {
          "id": "storm-light-darkening",
          "title": "Storm Light Darkening",
          "text": "The scene begins bright and clear, then heavy cloud cover gradually rolls in, dimming the overall light to a flat, cool gray and slightly desaturating the colors in the scene, with a faint increase in wind-blown movement in any foliage by the end of the clip. The darkening should be gradual and even across the frame. Avoid any lightning-strobe style flashing unless explicitly wanted, and don't let the color grade shift so far that surfaces lose recognizable detail.",
          "bestFor": "Dramatic exterior or landscape shots building tension or foreboding mood."
        },
        {
          "id": "firelight-reflection-on-water",
          "title": "Firelight Reflection on Water",
          "text": "Starting with a calm body of water lit by a nearby fire or lantern, animate the warm light flickering and reflecting in soft, rippling streaks across the water's surface, with small natural ripples distorting the reflection gently throughout the clip. The reflection's flicker should follow the light source's flicker, not move independently. Avoid the water surface freezing into a static mirror or the reflection separating unnaturally from the light source's movement.",
          "bestFor": "Nighttime waterfront, campfire, or lakeside ambiance shots."
        }
      ],
      "suitableFor": "Turning a midday exterior photo into a warm, cinematic golden-hour mood shot.; Cozy interior scenes, restaurant tablescapes, or romantic mood shots with…"
    },
    {
      "id": "time-lapse-speed-effects",
      "num": 7,
      "name": "Time-Lapse & Speed Effects",
      "shortName": "Time-lapse",
      "group": "atmosphere",
      "icon": "fa-clock",
      "hue": 48,
      "desc": "Cloud streaks, day-to-night, compressed motion.",
      "intro": "Prompts that compress a long stretch of time into a few seconds of motion - clouds racing by, seasons turning, cities pulsing with traffic - for that classic time-lapse feeling generated from a single still photo.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "fast-moving-cloud-streaks",
          "title": "Fast-Moving Cloud Streaks",
          "text": "The sky in the source photo starts with clouds in their photographed positions, then the clouds stretch and streak steadily across the frame in one consistent direction, thinning and reforming continuously as though many hours of sky have been compressed into seconds. The ground and any buildings or landscape below stay completely static. Avoid the clouds warping into unnatural blob shapes or reversing direction mid-clip, and keep the horizon line fixed with no drift in the landscape below.",
          "bestFor": "Landscape or skyline photos needing dynamic sky motion without touching the rest of the scene."
        },
        {
          "id": "day-to-night-transition",
          "title": "Day-to-Night Transition",
          "text": "The scene begins in full daylight, then light gradually dims through late afternoon, dusk, and into night, with practical lights in windows or streetlamps switching on as ambient light fades and the sky shifting from blue to orange to deep navy with stars emerging by the end. The transition should be one smooth, continuous progression, not distinct jump cuts between times of day. Avoid abrupt exposure jumps at any single point in the sequence, and keep every building and object position locked throughout.",
          "bestFor": "Establishing shots for real estate, travel, or cityscape content wanting a full-day compression."
        },
        {
          "id": "city-traffic-flow",
          "title": "City Traffic Flow",
          "text": "Starting from a still street scene with parked or stationary vehicles, animate a continuous flow of car light trails streaming through the frame - white streaks moving away from camera and red streaks moving toward it - at a steady, consistent speed for the duration of the clip. Buildings, sidewalks, and pedestrians outside the road remain static. Avoid the light trails jumping or breaking mid-street, and don't let vehicles morph or duplicate unnaturally as they pass.",
          "bestFor": "Urban night skyline or street-level shots wanting classic time-lapse traffic energy."
        },
        {
          "id": "building-construction-progress",
          "title": "Building Construction Progress",
          "text": "The scene starts with a bare foundation or partially built structure, then the building rises in compressed stages - framing appearing, walls filling in, and windows and finishing details settling into place - arriving at a completed structure by the end of the clip. Each stage should blend smoothly into the next rather than popping in fully formed. Avoid materials clipping through each other or scaffolding appearing and vanishing inconsistently, and keep the surrounding site and camera framing fixed.",
          "bestFor": "Real estate development, architecture pitch, or before/after construction storytelling."
        },
        {
          "id": "autumn-leaves-falling",
          "title": "Autumn Leaves Falling",
          "text": "Starting from trees full of green or early-autumn leaves, animate the foliage gradually shifting color to deep orange and red while leaves detach and drift down steadily, settling into a light covering on the ground below by the end of the clip. The leaf fall should be continuous and gentle, drifting with slight natural sway rather than dropping straight down. Avoid leaves clipping through branches or the ground, and keep tree branch structure stable underneath the changing foliage.",
          "bestFor": "Seasonal transition content for parks, gardens, or exterior property shots."
        },
        {
          "id": "snow-arriving-and-settling",
          "title": "Snow Arriving and Settling",
          "text": "The scene begins clear and bare, then snow begins to fall steadily, gradually accumulating a soft white layer across rooftops, ground, and branches by the end of the clip, with flakes drifting at a natural, slightly varied speed. Accumulation should build gradually and evenly rather than appearing all at once. Avoid the snow layer appearing patchy or teleporting into place, and keep existing textures and edges visible beneath a believable, gradually thickening layer.",
          "bestFor": "Seasonal exterior shots or property listings wanting a winter-arrival mood."
        },
        {
          "id": "crowd-flow-through-a-public-space",
          "title": "Crowd Flow Through a Public Space",
          "text": "Starting from a plaza, station, or public space with a few static figures, animate a steady stream of pedestrians moving through the space in multiple directions at a brisk, compressed pace, weaving naturally around fixed elements like benches or pillars. The architecture and any stationary landmarks remain completely fixed. Avoid figures merging into each other or clipping through structures, and don't let any single figure's proportions distort as they move through denser areas of the crowd.",
          "bestFor": "Urban lifestyle, transit hub, or civic space content needing a sense of bustling energy."
        },
        {
          "id": "star-trails-across-the-night-sky",
          "title": "Star Trails Across the Night Sky",
          "text": "The scene starts in a clear night sky with stars in fixed points, then the stars stretch into smooth, gently curved trails rotating around a fixed point in the sky, as though many hours of exposure were compressed into seconds, while the landscape below stays completely still and dark. The trail curvature should be even and consistent with natural celestial rotation. Avoid any trail suddenly breaking or reversing direction, and keep foreground silhouettes crisp and unmoving throughout.",
          "bestFor": "Night landscape or astrophotography-style content wanting dramatic sky motion."
        },
        {
          "id": "blooming-flower-time-lapse",
          "title": "Blooming Flower Time-Lapse",
          "text": "Starting from a closed or partially closed flower bud, animate the petals unfurling gradually and smoothly outward into a full, open bloom, with subtle color deepening in the petals as they open fully by the end of the clip. The unfurling should follow a natural, continuous curling motion from the center outward. Avoid petals clipping through one another or snapping into the open position, and keep the stem and leaves stable while only the bloom itself moves.",
          "bestFor": "Nature, garden, or product content needing a gentle, organic growth moment."
        },
        {
          "id": "tide-rolling-in-and-out",
          "title": "Tide Rolling In and Out",
          "text": "The scene starts with the shoreline at its photographed water line, then waves roll in and recede repeatedly at a brisk, compressed pace, with the wet sand line shifting gradually further up the beach as the tide rises by the end of the clip. Wave motion should stay rhythmic and consistent in direction and speed. Avoid water clipping through rocks or the shoreline jumping discontinuously between frames, and keep any fixed landmarks like piers or cliffs completely stationary.",
          "bestFor": "Coastal landscape or travel content wanting rhythmic, compressed ocean motion."
        },
        {
          "id": "shifting-shadows-across-a-sundial-day",
          "title": "Shifting Shadows Across a Sundial Day",
          "text": "Starting at morning with long shadows cast to one side of any vertical object in frame, animate the shadows shortening, swinging beneath the object at midday, then lengthening out to the opposite side by late afternoon, compressed into a few seconds. The shadow rotation should be smooth and match a believable arc of the sun. Avoid shadows snapping between positions or detaching from the base of the object casting them, and keep overall scene lighting brightness changing gradually rather than in sudden steps.",
          "bestFor": "Architectural or landscape photos wanting to convey a full day passing through shadow movement alone."
        },
        {
          "id": "harbor-or-marina-activity-compression",
          "title": "Harbor or Marina Activity Compression",
          "text": "The scene starts with boats docked in their photographed positions, then compressed motion shows boats arriving, departing, and gently rocking at their moorings, with water ripples and reflected light shifting continuously throughout the clip. Docks and fixed structures remain completely static. Avoid boats clipping through docks or each other, and keep hull reflections consistent with each boat's actual position rather than floating independently on the water surface.",
          "bestFor": "Waterfront property, marina, or coastal business content wanting lively compressed activity."
        }
      ],
      "suitableFor": "Landscape or skyline photos needing dynamic sky motion without touching the rest of the scene.; Establishing shots for real estate, travel, or cityscape…"
    },
    {
      "id": "real-estate-architecture",
      "num": 8,
      "name": "Real Estate & Architecture",
      "shortName": "Real estate",
      "group": "vertical",
      "icon": "fa-house",
      "hue": 160,
      "desc": "Room reveals, twilight exteriors, listing walkthroughs.",
      "intro": "Prompts for turning still property photos into smooth walkthrough-style clips - the kind of gentle pans and push-ins used in real estate listings and architecture showcases to make a space feel explorable rather than flat.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "living-space-room-reveal-pan",
          "title": "Living Space Room Reveal Pan",
          "text": "The camera starts framed on one side of the room as photographed, then pans smoothly and steadily across the space at a constant speed, revealing furniture, windows, and the far wall in sequence before settling on a balanced final composition. The pan should move on a single horizontal axis without any vertical drift. Guard against walls or door frames warping or bending as they pass through frame, and keep the pan speed constant rather than accelerating or jerking partway through.",
          "bestFor": "Listing videos or walkthrough intros showcasing a full living room or open-plan space."
        },
        {
          "id": "exterior-twilight-establishing-shot",
          "title": "Exterior Twilight Establishing Shot",
          "text": "The scene starts as photographed in daylight or neutral light, then the sky gradually deepens into a rich twilight blue while exterior and interior lights warm up and brighten, arriving at a classic dusk real-estate hero shot by the end of the clip. The camera itself stays completely still during this lighting transition. Avoid flickering as lights switch on, and keep the building's architectural lines crisp and unwarped throughout the color and brightness shift.",
          "bestFor": "Hero exterior shots meant to open or close a property listing video with dramatic curb appeal."
        },
        {
          "id": "interior-panning-establishing-shot",
          "title": "Interior Panning Establishing Shot",
          "text": "Starting from a fixed wide view of the room, the camera pans slowly and evenly from left to right (or right to left) at a consistent height and speed, keeping the floor line level throughout and never tilting up or down. This should read as a single deliberate sweep, not a series of smaller stops. Avoid any warping of straight architectural lines like door frames or ceiling edges as they move through frame, and don't let the pan speed change partway through the shot.",
          "bestFor": "General interior room shots used as connective footage between rooms in a listing video."
        },
        {
          "id": "room-to-room-transition-feel",
          "title": "Room-to-Room Transition Feel",
          "text": "The camera starts framed on a doorway or open threshold from within one room, then pushes forward steadily through the doorway as though walking into the adjoining space, with the new room's furniture and lighting resolving into focus by the end of the clip. The forward motion should be smooth and at walking pace, without any sudden acceleration. Guard against the doorway frame warping or stretching as the camera passes through it, and avoid any teleporting jump where the perspective snaps rather than travels.",
          "bestFor": "Connective footage meant to simulate physically walking from one room into the next."
        },
        {
          "id": "kitchen-counter-detail-reveal",
          "title": "Kitchen Counter Detail Reveal",
          "text": "Starting from a wider view of the kitchen, the camera pushes in slowly and steadily toward the countertop and island area, gradually revealing material texture, fixtures, and any staged details like a fruit bowl or utensils in sharper focus by the end of the clip. The push-in should be a single smooth dolly-style movement, not a zoom that flattens perspective. Avoid warping of straight cabinet lines or countertop edges as the camera approaches, and keep reflective surfaces like faucets or appliances from glitching or smearing.",
          "bestFor": "Kitchen feature shots highlighting finishes, countertops, and staged details."
        },
        {
          "id": "backyard-and-pool-reveal",
          "title": "Backyard and Pool Reveal",
          "text": "The camera starts on a framed view of the patio or house exterior, then pans or glides smoothly outward to reveal the pool and yard area, with water in the pool showing gentle natural ripple movement and any surrounding foliage swaying softly by the end of the clip. The reveal motion should be one continuous, unhurried movement. Avoid the water surface freezing into a flat plane or glitching with unnatural reflections, and keep fence lines and hardscaping from warping as new areas enter frame.",
          "bestFor": "Outdoor living space listings wanting to showcase pool and yard amenities with life and movement."
        },
        {
          "id": "staircase-ascending-reveal",
          "title": "Staircase Ascending Reveal",
          "text": "Starting from the base of a staircase as photographed, the camera moves upward at a steady, walking-like pace, following the sightline of the stairs and revealing the upper landing or floor gradually by the end of the clip. The ascent should follow a smooth, consistent vertical-diagonal path matching the staircase angle. Guard against the stair railings or steps warping or bending during the ascent, and avoid any floating sensation where the movement doesn't match the physical geometry of the stairs.",
          "bestFor": "Multi-level homes wanting to showcase the transition between floors with a sense of physical movement."
        },
        {
          "id": "curb-appeal-front-of-house-push-in",
          "title": "Curb-Appeal Front-of-House Push-In",
          "text": "The camera starts on a wide view of the home's exterior from the street, then pushes in slowly and steadily toward the front entrance, gradually bringing architectural details like the door, windows, and landscaping into sharper focus by the end of the clip. The push should be a constant, gentle speed with no acceleration bursts. Avoid the roofline or window frames warping as the camera nears the building, and keep any foreground landscaping from distorting or duplicating as it passes closer to frame.",
          "bestFor": "Opening shots for listing videos establishing the property's exterior presence."
        },
        {
          "id": "primary-bedroom-slow-reveal",
          "title": "Primary Bedroom Slow Reveal",
          "text": "Starting from the doorway view of the bedroom, the camera glides smoothly into the room at a slow, even pace, panning slightly to reveal the bed, windows, and natural light entering the space by the end of the clip. The motion should feel unhurried and steady, mimicking a calm walk-in. Avoid warping of window frames or ceiling lines during the glide, and keep bedding and soft furnishings from rippling or shifting unnaturally as the camera passes.",
          "bestFor": "Primary suite or bedroom feature shots wanting a calm, inviting pace."
        },
        {
          "id": "bathroom-fixture-detail-pan",
          "title": "Bathroom Fixture Detail Pan",
          "text": "The camera starts on a wider bathroom view, then pans smoothly across the vanity, mirror, and fixtures at a slow, even speed, letting reflective surfaces and tile detail resolve clearly by the end of the pan. The motion should remain on a single consistent axis without any tilting. Guard against mirror reflections glitching or doubling the room's geometry, and avoid tile grout lines warping as the pan crosses larger surfaces.",
          "bestFor": "Bathroom feature shots emphasizing finishes, tilework, and fixture quality."
        },
        {
          "id": "open-concept-overhead-drift",
          "title": "Open-Concept Overhead Drift",
          "text": "Starting from an elevated, wide-angle view of an open-concept living and dining space, the camera drifts slowly forward and slightly downward, as though gently descending toward eye level, bringing furniture groupings into clearer focus by the end of the clip. The descent should be smooth and gradual over the full duration. Avoid ceiling beams or overhead fixtures warping during the downward drift, and keep the floor plane from tilting or skewing as the camera height changes.",
          "bestFor": "Open-concept spaces wanting a dynamic establishing shot that transitions from overview to eye-level detail."
        },
        {
          "id": "home-office-or-study-slow-pan-with-window-light",
          "title": "Home Office or Study Slow Pan with Window Light",
          "text": "The camera starts framed on a desk and shelving setup, then pans gently across the room toward a window, with soft natural light appearing to brighten gradually as the pan reaches the window by the end of the clip. The pan and the light change should progress together at matching, gentle speeds. Avoid any exposure spike or flicker as brighter light enters frame, and keep bookshelves and desk items from shifting position or warping as the camera moves past them.",
          "bestFor": "Home office, study, or library-style rooms wanting a calm pan paired with natural light for warmth."
        }
      ],
      "suitableFor": "Listing videos or walkthrough intros showcasing a full living room or open-plan space.; Hero exterior shots meant to open or close a property listing video…"
    },
    {
      "id": "drone-aerial",
      "num": 9,
      "name": "Drone & Aerial",
      "shortName": "Drone",
      "group": "vertical",
      "icon": "fa-plane",
      "hue": 200,
      "desc": "Rising reveals, orbits, aerial tracking.",
      "intro": "Use these when you have a landscape, cityscape, building, vehicle, or outdoor scene photo and want to animate it as if a drone captured it. Paste one of these alongside your image in Grok Imagine, Runway, Kling, Luma, Sora, or Pika.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "rising-reveal-from-ground-level",
          "title": "Rising Reveal from Ground Level",
          "text": "Camera begins at ground level, close to the subject as framed in the image, then rises smoothly straight upward at a steady, gradual speed, gaining altitude to reveal the surrounding landscape or skyline beyond the original frame. The ascent stays vertical and even, without drifting sideways or accelerating suddenly. Do not warp or stretch the ground plane as new terrain comes into view, and keep the horizon line level throughout the rise.",
          "bestFor": "Turning a single ground-level photo of a building, monument, or landscape into a big reveal opener."
        },
        {
          "id": "full-orbit-around-a-central-subject",
          "title": "Full Orbit Around a Central Subject",
          "text": "Camera circles the central subject in the image along a smooth, continuous 360-degree arc at a constant altitude and distance, keeping the subject centered in frame the entire time. The orbit completes one full rotation at an even rotational speed without pausing or jumping. Maintain consistent lighting and shadow direction on the subject as the camera moves around it, and do not let the subject's geometry distort or flatten at any point in the rotation.",
          "bestFor": "Showcasing a single landmark, house, monument, or isolated object from every angle."
        },
        {
          "id": "descending-shot-into-the-scene",
          "title": "Descending Shot into the Scene",
          "text": "Camera starts high above the scene as framed and descends smoothly downward in a straight, controlled vertical drop, slowing gradually as it approaches a lower altitude closer to the main subject. Motion is steady and continuous with no sudden drops or speed changes. Keep cloud layers, tree canopies, or rooftops passing by sharp and undistorted rather than smearing or flickering as they pass through frame.",
          "bestFor": "Opening on a wide establishing view and settling the viewer into a specific location or subject."
        },
        {
          "id": "aerial-tracking-of-a-moving-subject",
          "title": "Aerial Tracking of a Moving Subject",
          "text": "Camera flies alongside a moving subject in the frame, such as a car on a road or a person walking below, matching its speed and direction precisely so the subject stays in a consistent position relative to the frame while the background scrolls past underneath. The tracking speed stays constant with no lag or catch-up motion. Do not let the tracked subject teleport or skip position between frames, and keep its size consistent as the camera holds distance.",
          "bestFor": "Car commercials, travel content, or any shot following a subject in motion across a landscape."
        },
        {
          "id": "fpv-dive-and-swoop",
          "title": "FPV Dive and Swoop",
          "text": "Camera begins high and dives forward and downward in a fast, fluid swooping arc, gaining speed through the descent before leveling out just above ground level or just above the subject, then continuing forward in a smooth low pass. The dive should feel continuous and controlled, like a single unbroken flight path, not a sudden drop. Avoid jittery or shaky frame-to-frame motion during the fast descent, and keep the terrain below rendering clearly rather than blurring into an unrecognizable smear.",
          "bestFor": "High-energy action reveals, extreme sports content, or dramatic FPV-drone-style openers."
        },
        {
          "id": "high-altitude-establishing-pull-back",
          "title": "High-Altitude Establishing Pull-Back",
          "text": "Camera starts close on the subject as shown in the image and pulls straight backward and upward simultaneously, retreating at a slow, even rate until the subject becomes small within a vast wide-angle establishing view of the surrounding environment. The pull-back is smooth and gradual with no acceleration bursts. Keep the subject's proportions stable and undistorted as it shrinks in frame, and avoid any warping of straight architectural lines or horizon edges.",
          "bestFor": "Ending a sequence on scale and context, or showing how small a subject is within its environment."
        },
        {
          "id": "low-sweeping-flyover-above-water-or-ground",
          "title": "Low Sweeping Flyover Above Water or Ground",
          "text": "Camera glides forward in a straight, low-altitude pass just above the surface shown in the image, whether water, sand, or grass, maintaining a consistent low height as it skims across the scene from foreground to background. The forward glide is smooth and level, without bobbing up and down. Keep the surface texture below, such as water ripples or grass blades, rendering consistently rather than flickering or morphing as the camera passes over.",
          "bestFor": "Coastal, lake, desert, or field footage that needs a fast, immersive skimming pass."
        },
        {
          "id": "slow-aerial-reveal-behind-an-obstruction",
          "title": "Slow Aerial Reveal Behind an Obstruction",
          "text": "Camera starts with a foreground element such as a tree, cliff edge, or rooftop partially blocking the main subject, then drifts slowly sideways and forward so the obstruction slides out of frame and the full subject or landscape is gradually revealed behind it. The reveal timing is unhurried and even. Do not let the foreground obstruction flicker or disappear abruptly; it should slide out of view naturally as the camera repositions.",
          "bestFor": "Cinematic reveals of a landmark, resort, or property emerging from behind natural framing elements."
        },
        {
          "id": "spiral-ascent-around-a-tall-subject",
          "title": "Spiral Ascent Around a Tall Subject",
          "text": "Camera rises vertically while simultaneously orbiting around a tall central subject, such as a tower, tree, or building, tracing a slow upward spiral that gains both height and rotation at a matched, even rate. The combined motion feels like a single corkscrew path rather than two separate movements. Keep the subject's vertical lines straight and stable throughout, avoiding any leaning, bending, or warping distortion as the camera spirals past it.",
          "bestFor": "Dramatic reveals of skyscrapers, towers, lighthouses, or tall natural landmarks."
        },
        {
          "id": "wide-establishing-hold-with-slow-push-in",
          "title": "Wide Establishing Hold with Slow Push-In",
          "text": "Camera holds a static wide aerial framing for a brief moment, then begins a slow, gentle push forward and downward toward a focal point within the scene, gradually tightening the frame around that area. The push-in speed stays slow and constant throughout, never snapping or jumping toward the target. Maintain consistent haze, color grading, and lighting across the whole move so the distant focal point does not suddenly sharpen or change color as the camera approaches.",
          "bestFor": "Documentary-style openers that let a wide vista breathe before guiding attention to a specific point of interest."
        },
        {
          "id": "reverse-pull-away-retreat",
          "title": "Reverse Pull-Away Retreat",
          "text": "Camera begins in a tight aerial framing close to the subject and retreats backward and slightly upward in a single continuous motion, increasing distance at a steady rate until the subject sits small within a wider frame, ending on a held wide shot. The retreat should not curve or drift laterally, staying on a direct backward path. Avoid any sudden jump in altitude or speed partway through the retreat, and keep edges of buildings or terrain crisp rather than smearing during the pull-away.",
          "bestFor": "Closing shots that transition from an intimate framing to a final wide send-off view."
        },
        {
          "id": "banking-turn-flyby",
          "title": "Banking Turn Flyby",
          "text": "Camera flies forward past the subject on a straight approach, then banks smoothly to one side as it passes, tilting the frame slightly like a plane turning, before leveling back out and continuing away from the subject on a new heading. The bank angle is gentle and smooth, holding briefly at its peak tilt before returning level. Do not let the horizon snap-tilt abruptly; the roll into and out of the bank should be gradual, and the subject should stay proportionally accurate without stretching during the turn.",
          "bestFor": "Dynamic flyby shots of coastlines, stadiums, or large properties that want a sense of piloted, real-flight motion."
        }
      ],
      "suitableFor": "Turning a single ground-level photo of a building, monument, or landscape into a big reveal opener.; Showcasing a single landmark, house, monument, or…"
    },
    {
      "id": "product-ecommerce",
      "num": 10,
      "name": "Product & E-Commerce",
      "shortName": "Product",
      "group": "vertical",
      "icon": "fa-box-open",
      "hue": 24,
      "desc": "Hero spins, detail pans, unboxing motion.",
      "intro": "Use these when you have a product photo, such as a bottle, gadget, cosmetic jar, shoe, or packaged item, and want to turn it into a scroll-stopping product video for a store listing, ad, or social post. Paste one of these alongside your image in Grok Imagine, Runway, Kling, Luma, Sora, or Pika.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "clean-360-degree-product-spin",
          "title": "Clean 360-Degree Product Spin",
          "text": "The product starts facing the camera exactly as shown in the image, resting in place on its base, then rotates a full 360 degrees around its own vertical axis at a slow, even speed, completing the turn smoothly and returning to the original front-facing angle at the end. The rotation speed stays constant throughout with no speeding up or slowing down. Do not let the product wobble, tilt, or drift off its central axis, and keep the label or logo text sharp and unwarped as it turns past the sides.",
          "bestFor": "Standard hero product listings where the shopper needs to see every side clearly."
        },
        {
          "id": "macro-texture-reveal",
          "title": "Macro Texture Reveal",
          "text": "The camera starts on a wide view of the full product as shown, then slowly pushes forward into an extreme close-up on one key surface detail, such as a fabric weave, metal finish, or condensation on glass, with the focus sharpening as it nears the surface. The push-in is smooth and continuous at a steady rate, never jumping distance. Keep the material's texture and color consistent as the camera nears it, avoiding any texture that melts, smears, or morphs into a different pattern during the zoom.",
          "bestFor": "Highlighting premium materials, fabric quality, or fine craftsmanship details that justify a higher price point."
        },
        {
          "id": "levitating-rotation-in-studio-light",
          "title": "Levitating Rotation in Studio Light",
          "text": "The product starts resting on its surface, then gently lifts a few inches upward as if weightless, settling into a slow hover, and begins a smooth continuous rotation in place while suspended, before gradually lowering back down to its original resting position at the end. The lift and descent are gradual and smooth, not sudden. Maintain a consistent studio-style shadow beneath the product that softens as it rises and returns as it lowers, and keep lighting direction fixed so reflections do not flicker or jump during the hover.",
          "bestFor": "Premium or luxury product ads such as perfume, jewelry, or tech gadgets that want a floating, high-end feel."
        },
        {
          "id": "unboxing-lid-reveal",
          "title": "Unboxing Lid Reveal",
          "text": "The camera holds steady on the closed box or container as shown, then the lid lifts open smoothly along its hinge or slides off to one side at a natural, unhurried pace, revealing the product nested inside as the interior comes into view. The opening motion follows a believable physical arc or slide, not an instant disappearance. Do not let the lid vanish abruptly or clip through the box walls, and keep interior lighting consistent with the exterior lighting as the inside becomes visible.",
          "bestFor": "Subscription boxes, gift sets, and packaged products where the unboxing moment is part of the appeal."
        },
        {
          "id": "hand-pick-up-and-presentation",
          "title": "Hand Pick-Up and Presentation",
          "text": "A hand enters the frame from the side or bottom and wraps naturally around the product as positioned in the image, lifting it smoothly upward and slightly toward the camera before holding it steady in a natural presentation angle. The hand's grip and finger placement stay anatomically consistent throughout the lift, with no extra or warped fingers appearing. Keep the product's shape and proportions stable as it is lifted, avoiding any stretching or clipping where the hand makes contact.",
          "bestFor": "Creating a human, relatable feel for handheld products like cosmetics, food items, or small electronics."
        },
        {
          "id": "splashing-liquid-accent",
          "title": "Splashing Liquid Accent",
          "text": "The product sits still and centered as shown, while liquid, such as water droplets, juice, or a colored splash, arcs into frame from one side and wraps around or splashes against the product's surface, then settles with a few droplets clinging or dripping off. The splash follows a natural arc and gravity-based fall, not a floating or looping motion. Keep the product itself perfectly still and undistorted throughout, and avoid liquid that clips through solid surfaces or freezes mid-air unnaturally.",
          "bestFor": "Beverage bottles, skincare with liquid textures, or any product wanting a refreshing, dynamic accent."
        },
        {
          "id": "slow-motion-spray-mist",
          "title": "Slow-Motion Spray Mist",
          "text": "The product remains stationary and centered in frame, while a fine mist or spray bursts from its nozzle or an implied source just off-frame, drifting outward and dissipating gradually in a soft slow-motion plume. The mist expands and fades at a smooth, gradual rate without abrupt cuts. Do not let the mist particles clump into flickering blobs or disappear instantly; the dispersal should thin out gradually and evenly.",
          "bestFor": "Perfumes, air fresheners, cleaning sprays, or cosmetic mists where atmosphere sells the product."
        },
        {
          "id": "packaging-fold-out-reveal",
          "title": "Packaging Fold-Out Reveal",
          "text": "The camera holds on the fully closed package as shown, then its flaps or sides unfold outward in sequence at a natural, even pace, opening like a blooming box until the product inside is fully exposed and centered in frame. Each flap moves independently but in a smooth, coordinated sequence rather than all at once. Keep the packaging material rigid and consistent in color as it unfolds, avoiding any bending that looks like the cardboard or material is melting or glitching.",
          "bestFor": "Cosmetic packaging, tech unboxings, or specialty food packaging designed with an eye-catching fold-out structure."
        },
        {
          "id": "rotating-pedestal-with-light-sweep",
          "title": "Rotating Pedestal with Light Sweep",
          "text": "The product stands still at the center of a pedestal or platform as shown, and the platform itself rotates a slow, smooth 360 degrees beneath the product while a soft studio light sweeps gradually across its surface, creating a moving highlight that travels around the product once per rotation. The light sweep and rotation stay synchronized at a constant pace. Do not let the highlight jump or strobe as it crosses reflective surfaces, and keep the product's position centered on the pedestal without sliding off-axis.",
          "bestFor": "Watches, bottles, or reflective products where a moving highlight emphasizes shine and premium finish."
        },
        {
          "id": "ingredient-or-component-explosion-view",
          "title": "Ingredient or Component Explosion View",
          "text": "The product starts fully assembled as shown, then its main components or ingredients gently separate and float outward from the body in different directions, spreading into a clean exploded arrangement before slowly drawing back together into the original assembled form. The separation and reassembly move at a matched, even speed in both directions. Keep each component's shape and scale accurate throughout the separation, avoiding any piece that flickers, duplicates, or merges into another during the motion.",
          "bestFor": "Tech gadgets, skincare with multiple ingredients, or multi-part products that want to show what's inside."
        },
        {
          "id": "close-up-cap-or-lid-twist-off",
          "title": "Close-Up Cap or Lid Twist-Off",
          "text": "The camera frames a tight close-up on the product's cap or lid as shown, which then twists and lifts upward in a natural unscrewing motion, rising off the container's threads at a steady, believable rotational speed before clearing the top completely. The twisting motion follows a consistent spiral path matching real thread mechanics, not a straight vertical lift. Do not let the cap clip through the container body or snap off instantly; keep the removal gradual and physically grounded.",
          "bestFor": "Skincare jars, bottled beverages, or supplement containers where the opening ritual matters to the buyer."
        },
        {
          "id": "countertop-setting-establishing-shot",
          "title": "Countertop Setting Establishing Shot",
          "text": "The camera starts on a wide view of the product placed within a styled setting, such as a kitchen counter or bathroom shelf, then slowly drifts forward and slightly downward toward the product, gradually isolating it from the background as the surrounding elements soften out of focus. The drift is slow and continuous with no sudden refocus jumps. Keep background elements stable and undistorted as they blur, avoiding any warping of nearby objects during the focus shift.",
          "bestFor": "Lifestyle-style product shots that want to show context before drawing full attention to the item itself."
        }
      ],
      "suitableFor": "Standard hero product listings where the shopper needs to see every side clearly.; Highlighting premium materials, fabric quality, or fine craftsmanship…"
    },
    {
      "id": "nature-landscape",
      "num": 11,
      "name": "Nature & Landscape",
      "shortName": "Nature",
      "group": "vertical",
      "icon": "fa-tree",
      "hue": 130,
      "desc": "Wind, water, clouds, epic establishing shots.",
      "intro": "Use these when you have a photo of scenery, such as a coastline, forest, mountain, river, or open field, and want to bring the natural elements in it to life. Paste one of these alongside your image in Grok Imagine, Runway, Kling, Luma, Sora, or Pika.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "ocean-waves-rolling-to-shore",
          "title": "Ocean Waves Rolling to Shore",
          "text": "The water in the scene begins calm as shown, then waves gradually build and roll forward toward the shoreline in a steady, repeating rhythm, cresting and breaking into white foam as they reach the sand before receding back out. Each wave cycle follows the same natural timing and pace as the one before it. Keep the shoreline and rock formations completely fixed and undistorted, and avoid foam patterns that flicker or repeat in an obvious looping pattern.",
          "bestFor": "Coastal and beach photos that need a calming, rhythmic ocean motion."
        },
        {
          "id": "river-current-flowing-downstream",
          "title": "River Current Flowing Downstream",
          "text": "The water surface starts still as framed, then begins flowing steadily in one consistent direction downstream, with surface ripples, small eddies, and reflections moving at a natural, even pace over the rocks and bends in the riverbed. The flow direction and speed stay constant throughout the clip. Do not let rocks, logs, or riverbanks shift position or warp as the water moves around them, and avoid water texture that morphs into an unnatural repeating pattern.",
          "bestFor": "River, stream, and creek photography that wants a naturalistic sense of current and movement."
        },
        {
          "id": "waterfall-cascading-motion",
          "title": "Waterfall Cascading Motion",
          "text": "The waterfall in the image begins to flow, with water pouring steadily over the edge and cascading downward into the pool below, breaking into mist and foam on impact at a consistent, continuous rate. The falling water maintains even volume and speed from top to bottom without pulsing or stopping. Keep the surrounding cliff face and rock edges completely stable, and avoid the falling water flickering or freezing mid-drop between frames.",
          "bestFor": "Waterfall and gorge photography that needs the falling water to feel continuous and powerful."
        },
        {
          "id": "wind-moving-through-tall-grass",
          "title": "Wind Moving Through Tall Grass",
          "text": "A gentle wind begins to move across the field as shown, causing the tall grass or wheat to bend and ripple in soft, wave-like patterns that travel across the landscape from one side toward the other. The rippling motion flows smoothly and continuously, like waves passing through the field. Do not let the grass blades morph into a blurred texture or flicker unnaturally, and keep the ground and any fixed background elements completely still.",
          "bestFor": "Open meadow, prairie, or farmland photos that want a soft, organic sense of breeze."
        },
        {
          "id": "wind-rustling-through-trees",
          "title": "Wind Rustling Through Trees",
          "text": "The trees in the scene begin to sway gently as a breeze passes through, with leaves and branches rustling and shifting naturally while the trunks remain rooted and mostly stationary. The swaying motion is soft and irregular like real wind, not a rigid repeating sway. Keep tree trunks and the ground beneath them fixed in place, and avoid leaves that flicker, duplicate, or blur into indistinct green smears.",
          "bestFor": "Forest and woodland photos that want a living, breathing atmosphere without heavy weather."
        },
        {
          "id": "rolling-fog-drifting-through-the-scene",
          "title": "Rolling Fog Drifting Through the Scene",
          "text": "Thin layers of fog or mist begin to drift slowly across the landscape as shown, rolling gently over the ground or through the trees at a slow, even pace, gradually thickening or thinning as it moves and partially obscuring parts of the background before clearing. The fog's movement stays smooth and continuous in one general direction. Do not let the fog appear or vanish abruptly in patches, and keep the terrain beneath it stable and visible where the fog thins.",
          "bestFor": "Moody forest, valley, or early-morning landscape shots that want an atmospheric, cinematic drift."
        },
        {
          "id": "clouds-moving-across-a-mountain-range",
          "title": "Clouds Moving Across a Mountain Range",
          "text": "The sky above the mountains begins with clouds in their shown position, then the clouds drift steadily across the sky in one consistent direction at a slow, even pace, their shadows shifting gradually across the mountain slopes below as they pass. The cloud movement and shadow motion stay synchronized and smooth throughout. Keep the mountain silhouette and rock formations completely fixed, and avoid cloud shapes that morph unnaturally fast or flicker between different formations.",
          "bestFor": "Wide mountain and valley vistas that want a slow, majestic sense of time passing."
        },
        {
          "id": "rain-beginning-to-fall",
          "title": "Rain Beginning to Fall",
          "text": "The scene starts dry as shown, then rain gradually begins to fall, starting light and increasing steadily to a consistent, even downpour, with visible droplets streaking down and small ripples or splashes appearing on any exposed water or hard surfaces. The onset of rain builds gradually rather than starting at full intensity instantly. Keep the surrounding scenery stable and correctly lit, and avoid rain streaks that flicker, freeze, or repeat in an obvious looping pattern.",
          "bestFor": "Adding mood and drama to an outdoor scene, especially moody or storytelling-driven content."
        },
        {
          "id": "sunlight-breaking-through-forest-canopy",
          "title": "Sunlight Breaking Through Forest Canopy",
          "text": "The forest starts in even, shown lighting, then shafts of sunlight gradually break through gaps in the canopy above, growing brighter and more defined as they filter down through the leaves and create shifting light patterns on the forest floor. The light shafts brighten and shift gradually and softly, never snapping on instantly. Keep the trees and canopy shape unchanged throughout, and avoid the light beams flickering rapidly or appearing as flat, unnatural shapes.",
          "bestFor": "Forest and woodland photos that want a hopeful, golden-hour, or spiritual atmosphere."
        },
        {
          "id": "ripples-spreading-across-still-water",
          "title": "Ripples Spreading Across Still Water",
          "text": "The water surface begins perfectly still and mirror-like as shown, then a single ripple originates from one point, such as a dropped object or a light gust, and spreads outward in smooth, expanding concentric circles that gradually fade as they widen and reach the edges of the frame. The ripple expansion slows naturally as it spreads, matching real water physics. Do not let the reflection on the water warp or break apart chaotically, and keep the ripple rings evenly spaced without flickering.",
          "bestFor": "Calm lake, pond, or reflection photography that wants a single, elegant point of motion."
        },
        {
          "id": "golden-hour-light-shift-across-a-valley",
          "title": "Golden Hour Light Shift Across a Valley",
          "text": "The landscape begins lit as shown, then the warm sunlight gradually shifts and lengthens across the valley, with shadows slowly stretching and the overall color warming subtly as if time is passing toward sunset. The lighting transition happens gradually and evenly across the whole frame. Keep every fixed element, such as rock formations, trees, and structures, in their exact original position, and avoid any abrupt jump in color temperature or shadow direction.",
          "bestFor": "Wide valley or countryside vistas used as a slow, contemplative establishing shot."
        },
        {
          "id": "snow-beginning-to-fall-over-a-winter-landscape",
          "title": "Snow Beginning to Fall Over a Winter Landscape",
          "text": "The scene starts clear as shown, then snowflakes gradually begin drifting down from the sky, increasing steadily in density until a light, steady snowfall settles over the landscape, with a few flakes visibly landing on branches or the ground. The snowfall builds gradually rather than appearing all at once. Keep the landscape's existing snow cover and structures fixed in place, and avoid snowflakes that flicker, clump, or fall in an obviously repeating pattern.",
          "bestFor": "Winter landscape photos that want a quiet, gradually intensifying wintry atmosphere."
        }
      ],
      "suitableFor": "Coastal and beach photos that need a calming, rhythmic ocean motion.; River, stream, and creek photography that wants a naturalistic sense of current and…"
    },
    {
      "id": "fashion-portrait",
      "num": 12,
      "name": "Fashion & Portrait",
      "shortName": "Fashion",
      "group": "vertical",
      "icon": "fa-shirt",
      "hue": 310,
      "desc": "Runway energy, editorial portrait motion.",
      "intro": "Use these when you have a photo of a person, whether a fashion model, portrait subject, or influencer-style shot, and want to bring subtle, natural life to it. Paste one of these alongside your image in Grok Imagine, Runway, Kling, Luma, Sora, or Pika.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "fabric-rippling-in-a-gentle-breeze",
          "title": "Fabric Rippling in a Gentle Breeze",
          "text": "The subject holds their pose exactly as shown, while a soft breeze begins to move through their clothing, causing loose fabric such as a dress hem, scarf, or coat edge to ripple and lift gently outward before settling back down. The fabric motion is soft and continuous, never snapping stiffly between positions. Keep the subject's face, posture, and body proportions completely unchanged throughout, and avoid the fabric warping into an unnatural shape or clipping through the body.",
          "bestFor": "Editorial fashion shots where flowing fabric adds movement without changing the pose."
        },
        {
          "id": "hair-flowing-naturally-in-motion",
          "title": "Hair Flowing Naturally in Motion",
          "text": "The subject remains still in their original pose, while their hair begins to move naturally as if caught by a light wind, strands lifting, drifting sideways, and gently falling back into place in a soft, continuous motion. The hair movement follows natural weight and flow, with looser strands moving more than the roots. Do not let strands flicker, multiply, or merge into a blurred mass, and keep the hairline and face completely stable throughout.",
          "bestFor": "Beauty and portrait shots that want a soft, alive quality centered on the hair."
        },
        {
          "id": "turning-to-face-the-camera",
          "title": "Turning to Face the Camera",
          "text": "The subject starts in the profile or three-quarter angle shown in the image, then smoothly turns their head and shoulders toward the camera at a slow, even pace, settling into a direct forward-facing gaze by the end of the motion. The turn follows a natural rotational arc at the neck and shoulders, not a sudden snap. Keep facial features proportional and stable throughout the turn, avoiding any warping, doubling, or blurring of the eyes and face as the angle changes.",
          "bestFor": "Turning a profile shot into a direct-to-camera moment, useful for intros or reveal-style content."
        },
        {
          "id": "runway-style-walking-motion",
          "title": "Runway-Style Walking Motion",
          "text": "The subject starts standing still as shown, then begins walking forward in a confident, even stride toward the camera, with natural arm swing and hip motion matching each step, maintaining a steady walking pace throughout. The gait follows realistic body mechanics with weight shifting naturally between legs. Do not let legs or arms bend at unnatural angles or duplicate mid-stride, and keep the background environment stable as the subject advances.",
          "bestFor": "Fashion lookbook content or turning a standing pose into a runway-style clip."
        },
        {
          "id": "twirl-reveal-of-an-outfit",
          "title": "Twirl Reveal of an Outfit",
          "text": "The subject starts facing forward as shown, then rotates their body in a smooth 360-degree twirl, with the outfit's fabric flaring outward naturally due to the rotational momentum before the subject settles back to the original front-facing position. The twirl completes at a single even speed without pausing mid-turn. Keep the subject's proportions and face recognizable throughout the spin, and avoid the fabric or limbs blurring into distorted shapes during the fastest part of the rotation.",
          "bestFor": "Showing off a dress, skirt, or full outfit's movement and shape in one continuous motion."
        },
        {
          "id": "subtle-pose-shift-and-weight-change",
          "title": "Subtle Pose Shift and Weight Change",
          "text": "The subject holds close to their original pose, but shifts their weight gently from one leg to the other, with a small, natural adjustment in shoulder angle and head tilt, settling into a slightly different but related pose by the end. The shift is slow and minimal, reading as a natural micro-movement rather than a full re-pose. Keep facial identity, proportions, and clothing fit consistent throughout, avoiding any sudden jump between the two poses.",
          "bestFor": "Adding subtle realism to a static portrait without a dramatic change in composition."
        },
        {
          "id": "jewelry-glint-and-sway",
          "title": "Jewelry Glint and Sway",
          "text": "The subject remains still in their pose, while a piece of jewelry, such as earrings, a necklace, or a bracelet, sways gently with tiny natural movements and catches the light with a soft glint or sparkle as it moves. The glint appears and fades smoothly as the angle catches the light, not as a sudden flash. Keep the rest of the subject and their clothing completely static, and avoid the jewelry warping in shape or flickering unnaturally between frames.",
          "bestFor": "Close-up jewelry or accessory shots that want a small, elegant highlight of motion."
        },
        {
          "id": "fabric-texture-close-up-reveal",
          "title": "Fabric Texture Close-Up Reveal",
          "text": "The camera starts on a wider view of the subject as shown, then slowly pushes into a close-up on a specific fabric detail, such as a knit pattern, sequins, or silk folds, with the material catching subtle shifts in light and texture as the camera nears it. The push-in is slow and steady with no sudden jump in distance. Keep the fabric's weave and pattern consistent and sharp as the camera approaches, avoiding any texture that melts, smears, or duplicates during the zoom.",
          "bestFor": "Highlighting fabric quality or embellishment detail in luxury or textile-focused fashion content."
        },
        {
          "id": "gentle-head-tilt-with-soft-smile-emergence",
          "title": "Gentle Head Tilt with Soft Smile Emergence",
          "text": "The subject starts with a neutral expression and straight head position as shown, then tilts their head slightly to one side while a soft, natural smile gradually forms, completing the small shift in a relaxed, unhurried motion. The expression change builds gradually rather than snapping into place. Keep the eyes, teeth, and facial structure anatomically consistent throughout, avoiding any distortion of the mouth or asymmetric warping of the face.",
          "bestFor": "Warming up a neutral portrait into a more approachable, friendly moment."
        },
        {
          "id": "coat-or-jacket-flowing-open-in-wind",
          "title": "Coat or Jacket Flowing Open in Wind",
          "text": "The subject stands still as shown, while a gust of wind catches the edges of an open coat or jacket, lifting and billowing the fabric outward and backward before it settles gently back against the body. The billowing motion rises and falls smoothly, following the fabric's natural weight. Do not let the coat clip through the subject's body or flicker between open and closed positions, and keep the subject's stance and face fixed throughout.",
          "bestFor": "Dramatic outerwear shots that want strong, wind-driven fabric movement."
        },
        {
          "id": "walking-away-reveal",
          "title": "Walking Away Reveal",
          "text": "The subject starts facing the camera as shown, then turns and begins walking away in a natural, even stride, with the back of the outfit and hair gradually coming into full view as the distance from camera increases slightly. The walk-away motion is smooth and continuous at a steady pace. Keep body proportions and the outfit's fit consistent as the subject moves further from camera, avoiding any shrinking distortion or leg duplication during the stride.",
          "bestFor": "Ending a shot by revealing the back of a garment or creating a graceful exit moment."
        },
        {
          "id": "close-up-eye-and-gaze-shift",
          "title": "Close-Up Eye and Gaze Shift",
          "text": "The camera holds a tight close-up on the subject's eyes as shown, which then shift their gaze slowly from looking off to the side toward looking directly into the camera, with a slow, natural blink occurring partway through the motion. The gaze shift and blink move at a slow, human pace, not a rapid flick. Keep the iris shape, eyelid position, and surrounding skin anatomically consistent throughout, avoiding any warping, doubling, or unnatural stretching around the eye area.",
          "bestFor": "Intimate beauty close-ups or intro moments that want direct eye contact with the viewer."
        }
      ],
      "suitableFor": "Editorial fashion shots where flowing fabric adds movement without changing the pose.; Beauty and portrait shots that want a soft, alive quality centered on…"
    },
    {
      "id": "food-culinary",
      "num": 13,
      "name": "Food & Culinary",
      "shortName": "Food",
      "group": "vertical",
      "icon": "fa-utensils",
      "hue": 18,
      "desc": "Steam, pour, sizzle, macro food reveals.",
      "intro": "For turning still food photography into short, appetizing motion clips - the kind of subtle movement you see in restaurant ads and recipe videos. Paste one of these alongside your dish photo to bring it to life without distorting the food itself.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "steam-rising-from-a-hot-dish",
          "title": "Steam Rising From a Hot Dish",
          "text": "Begin on the plated dish exactly as shown, completely still. Thin wisps of steam begin curling upward from the hottest visible points of the food, drifting in soft, wavering S-shapes that thin out and dissipate naturally before reaching the top of frame. Keep the plate, garnish, and background completely static and geometrically unchanged - only the steam should move, and it must stay translucent and wispy rather than turning into thick fog or smoke.",
          "bestFor": "Hero shots of soups, ramen, grilled meats, or fresh-baked bread where warmth is the selling point."
        },
        {
          "id": "sauce-drizzle-in-slow-motion",
          "title": "Sauce Drizzle in Slow Motion",
          "text": "Start with the plated dish undrizzled. A thin stream of sauce begins pouring from just outside the top of frame, falling in a smooth, continuous ribbon that lands and pools gently across the dish, thickening slightly where it settles. End with the drizzle pattern complete and the stream cut off cleanly. The liquid must obey gravity and viscosity consistent with the sauce type shown - no floating droplets, no sauce reversing direction, and no sudden appearance of pooled sauce without the pour motion.",
          "bestFor": "Dessert plating, pasta dishes, or pancakes where a glossy drizzle adds visual appeal."
        },
        {
          "id": "spices-falling-into-frame",
          "title": "Spices Falling Into Frame",
          "text": "Open on the finished dish with no visible seasoning motion. A pinch of spice or herb flakes drifts down from above the frame, tumbling and rotating slightly as individual particles catch the light, then settling softly onto the surface of the food. Limit the fall to a single natural arc of particles rather than a continuous stream, and ensure particles land where gravity and the dish's surface contours would realistically place them, not scattered mid-air or clipping through the plate.",
          "bestFor": "Finishing-touch shots of pepper, herbs, cocoa powder, or powdered sugar being added tableside."
        },
        {
          "id": "sizzle-on-the-pan",
          "title": "Sizzle on the Pan",
          "text": "Start on food actively cooking in a pan, frame steady. Small bubbles of oil and juice pop rhythmically at the contact points between food and pan surface, releasing faint curls of heat-shimmer and thin smoke that rise and fade near the top of frame. The food itself should not shift position, deform, or flip - only surface-level sizzle, shimmer, and light smoke should animate, keeping the pan and utensils rigid and unmoving.",
          "bestFor": "Steak, bacon, or stir-fry shots where audible-feeling sizzle sells the freshness."
        },
        {
          "id": "cheese-melting-into-focus",
          "title": "Cheese Melting Into Focus",
          "text": "Begin with cheese in its pre-melt state (shredded, sliced, or block) resting on the hot food. The cheese gradually softens and slumps downward, edges rounding and thinning as it stretches slightly under gravity and begins to pool into the dish beneath it. Keep the melt gradual and physically continuous - avoid the cheese instantly liquifying, warping into an unnatural shape, or the surrounding food shifting or deforming during the melt.",
          "bestFor": "Pizza, burgers, grilled cheese, or baked pasta close-ups where gooey melt is the payoff moment."
        },
        {
          "id": "chocolate-or-ice-cream-melt-drip",
          "title": "Chocolate or Ice Cream Melt Drip",
          "text": "Start with a solid piece of chocolate or a scoop of ice cream fully intact. The surface begins to soften first, developing a faint glossy sheen before a single drip forms at the lowest edge, elongates, and falls in a slow, thinning thread. End with the drip either landing on the surface below or breaking cleanly. The material should thin and stretch the way a real viscous liquid would, never snapping back upward or detaching mid-air without a visible break point.",
          "bestFor": "Dessert product shots, gelato ads, or chocolate bar close-ups needing an indulgent, slow-motion feel."
        },
        {
          "id": "close-up-fork-reveal",
          "title": "Close-Up Fork Reveal",
          "text": "Open on the untouched dish with a fork resting beside or above it. The fork lowers smoothly into frame, pierces or scoops a portion of the food, and lifts back up to reveal the interior texture (flaky layers, melted center, sauce pooling in the cavity) as it pulls away. Keep the utensil's entry and exit angle consistent and steady, and avoid any jitter or hand-shake in the fork's path, since sudden erratic movement here reads as an animation glitch rather than a real bite.",
          "bestFor": "Interior-reveal shots of cakes, dumplings, or stuffed dishes where the \"money shot\" is what's inside."
        },
        {
          "id": "condensation-forming-on-a-cold-drink",
          "title": "Condensation Forming on a Cold Drink",
          "text": "Start with a glass or bottle that is clean and dry. Fine beads of condensation begin appearing gradually across the glass surface, growing slightly in size before a few beads merge and trail slowly downward under gravity, leaving thin wet streaks behind. Keep the glass and its contents completely stationary, and ensure droplets only ever move downward at a slow, consistent pace - no upward movement, no droplets appearing and vanishing abruptly.",
          "bestFor": "Cold beverage ads - iced coffee, soda, beer, or cocktails - where \"refreshingly cold\" needs to read instantly."
        },
        {
          "id": "pouring-into-the-glass",
          "title": "Pouring Into the Glass",
          "text": "Begin with an empty or partially empty glass in frame. Liquid streams in from an unseen source above, falling in a steady, slightly narrowing column that fills the glass from the bottom up, with realistic foam or fizz forming at the surface as it rises. Stop the pour just before overflow. The fill level must rise continuously and smoothly without the liquid level jumping or the glass changing shape, and any foam should build gradually rather than appearing instantly at full volume.",
          "bestFor": "Beverage pours - juice, wine, beer, or coffee - used as an opening or transition shot."
        },
        {
          "id": "ingredient-toss-and-fold",
          "title": "Ingredient Toss and Fold",
          "text": "Start on raw ingredients resting in a bowl or pan, untouched. The ingredients lift slightly as if tossed by an unseen hand or pan motion, tumbling over one another in a loose arc before settling back down in a slightly more mixed arrangement. Keep the motion contained to a single toss-and-land cycle rather than a repeating loop, and make sure individual pieces maintain consistent size and shape throughout - no pieces merging, splitting, or teleporting between positions.",
          "bestFor": "Salad prep, stir-fry ingredients, or trail mix shots that need a sense of freshness and motion."
        },
        {
          "id": "whisk-or-stir-reveal",
          "title": "Whisk or Stir Reveal",
          "text": "Open on a bowl of liquid or batter sitting still. A whisk or spoon enters from frame edge and begins a smooth circular stirring motion, causing the surface to ripple, swirl, and slightly change texture (aerating batter, blending a sauce) as it moves. End with the utensil lifting away and the surface settling into gentle ripples. Keep the stirring path circular and consistent in speed, avoiding any warping of the bowl or sudden changes in liquid volume during the motion.",
          "bestFor": "Baking prep shots, sauce-making, or cocktail-mixing content emphasizing hands-on craft."
        },
        {
          "id": "garnish-placement-finale",
          "title": "Garnish Placement Finale",
          "text": "Begin with the finished dish plated but missing its final garnish. A garnish piece (herb sprig, citrus twist, edible flower) drifts or is placed gently into frame from above, settling onto the dish with a small, natural bounce or resting motion before going still. Keep the descent slow and controlled with a single soft settle - avoid the garnish clipping into the food's surface or hovering unnaturally before contact.",
          "bestFor": "Final \"polish\" shots used as the last frame in a recipe video or menu highlight reel."
        }
      ],
      "suitableFor": "Hero shots of soups, ramen, grilled meats, or fresh-baked bread where warmth is the selling point.; Dessert plating, pasta dishes, or pancakes where a…"
    },
    {
      "id": "automotive",
      "num": 14,
      "name": "Automotive",
      "shortName": "Automotive",
      "group": "vertical",
      "icon": "fa-car",
      "hue": 0,
      "desc": "Hero reveals, detail glides, road presence.",
      "intro": "For turning a still car photo into a short motion clip that feels like it came from a real automotive ad - reveals, detail shots, and cinematic pans. Paste one of these alongside your vehicle image to animate it convincingly.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "driving-reveal-through-frame",
          "title": "Driving Reveal Through Frame",
          "text": "Start with the car positioned as in the source image, stationary against its background. The car begins moving smoothly from one side of frame toward the other, maintaining a consistent speed and a fixed camera perspective as if tracked by a parallel-moving camera, with the background blurring slightly to suggest motion. End with the car exiting frame or settling into a three-quarter hero position. Keep the car's body shape and proportions fixed throughout - no warping of the chassis, wheels, or windows as it moves, and no sudden speed changes mid-shot.",
          "bestFor": "Opening or closing hero shots in a car ad establishing the vehicle in motion."
        },
        {
          "id": "wheel-spin-detail-close-up",
          "title": "Wheel Spin Detail Close-Up",
          "text": "Open tightly framed on a single wheel and rim, static. The wheel begins spinning smoothly, rim spokes blurring into a soft circular motion trail while the tire sidewall stays crisp and grounded against the road surface. Keep the car body and suspension height completely still during the spin, and ensure the rim's rotation direction stays consistent throughout - no flickering between spoke positions or the rim appearing to stutter-step rather than spin continuously.",
          "bestFor": "Performance-focused detail cutaways emphasizing rims, brakes, or tire tread."
        },
        {
          "id": "headlight-ignition-glow",
          "title": "Headlight Ignition Glow",
          "text": "Start on the front of the car in low light with headlights off and dark. The headlights power on gradually, brightening from a dim glow to full intensity over a brief, smooth ramp, casting a soft pool of light forward onto the road surface as they reach full brightness. Keep the rest of the scene's ambient lighting unchanged during the ramp-up, and avoid any flicker, strobing, or the light source jumping straight to full brightness without the gradual build.",
          "bestFor": "Dusk or night-mode car ads where the headlight \"wake up\" moment adds drama."
        },
        {
          "id": "taillight-sequential-glow",
          "title": "Taillight Sequential Glow",
          "text": "Open on the rear of the car with taillights dark or dim. The taillights illuminate in a smooth sequence - brake light first, then indicator or accent strip - building to a full red glow that reflects faintly onto the pavement below. Keep the reflection subtle and grounded in the correct location beneath the lights, and avoid the glow oversaturating into a blown-out white flare or bleeding unnaturally onto the body panels.",
          "bestFor": "Rear three-quarter shots used as a closing or transition frame in premium car content."
        },
        {
          "id": "interior-dashboard-pan",
          "title": "Interior Dashboard Pan",
          "text": "Begin inside the cabin, framed on the dashboard and steering wheel, completely still. The camera drifts in a slow, steady pan across the dash - from instrument cluster to center console to infotainment screen - as if mounted on a smooth slider, with the screen's display softly lighting up as the pan passes over it. Keep the pan speed constant with no jerks or direction reversals, and keep all physical controls and textures fixed in place, changing only the screen's illumination.",
          "bestFor": "Interior feature showcases highlighting tech, materials, and cabin ambiance."
        },
        {
          "id": "exterior-360-reveal",
          "title": "Exterior 360 Reveal",
          "text": "Start with the car centered in frame as shown in the source image. The camera orbits smoothly around the vehicle at a constant height and distance, revealing each side and the rear before continuing back toward the starting angle, as if on a circular motion rig. Keep the car itself perfectly stationary and grounded on the surface throughout, and keep the orbit speed even - no jump cuts, no sudden acceleration, and no distortion of the car's silhouette as the angle changes.",
          "bestFor": "Full walk-around showcase shots for listings, launches, or turntable-style product reveals."
        },
        {
          "id": "door-open-reveal",
          "title": "Door Open Reveal",
          "text": "Open on the car with all doors closed. A door swings open smoothly on its hinge at a natural speed, revealing the interior seat and trim as the cabin light switches on inside. End with the door held open at a natural resting angle, not fully extended past its mechanical limit. Keep the hinge motion physically accurate to the door's pivot point, and avoid the door clipping through the body panel or opening at an angle beyond what the vehicle's design would allow.",
          "bestFor": "Feature reveals emphasizing interior access, cabin lighting, or seat materials."
        },
        {
          "id": "trunk-or-hatch-reveal",
          "title": "Trunk or Hatch Reveal",
          "text": "Start with the trunk or hatch closed, car otherwise static. The trunk lid rises smoothly along its hinge arc, revealing the cargo area as ambient or trunk-light illumination gradually brightens the space inside. Keep the lid's opening speed even and its final resting angle mechanically realistic, and avoid the cargo area's contents or lighting appearing suddenly rather than brightening in step with the lid's motion.",
          "bestFor": "Cargo capacity or utility-focused shots for SUVs, hatchbacks, and trucks."
        },
        {
          "id": "rain-on-windshield-with-wipers",
          "title": "Rain on Windshield With Wipers",
          "text": "Open on the windshield, dry or lightly wet, viewed from outside or the driver's seated perspective. Raindrops begin streaking down the glass in scattered, gravity-driven paths, gathering slightly at the base before a wiper blade sweeps across in one smooth arc, clearing a fan-shaped path of visibility. Keep the wiper's arc consistent with its pivot mount and speed steady, and make sure raindrops always fall downward and never freeze mid-frame or reverse direction between wipes.",
          "bestFor": "Weather-condition or safety-feature shots emphasizing visibility and control."
        },
        {
          "id": "engine-bay-detail-reveal",
          "title": "Engine Bay Detail Reveal",
          "text": "Begin with the hood already open, camera framed on the engine bay, static. The camera pushes in slowly toward a key component (engine cover, badge, or intake), with a subtle rack-focus shift bringing that detail into sharp clarity while the surrounding bay softens slightly out of focus. Keep the push-in motion slow and linear with no zoom judder, and avoid introducing any moving parts or steam effects unless the source image shows the engine running.",
          "bestFor": "Performance or engineering-focused detail shots in enthusiast-oriented car content."
        },
        {
          "id": "badge-and-grille-close-up-glint",
          "title": "Badge and Grille Close-Up Glint",
          "text": "Open tight on the car's badge or grille, static under ambient light. A soft highlight of light sweeps slowly across the chrome or painted surface, catching the badge's edges and grille slats in sequence as if a light source is passing by just out of frame. Keep the sweep smooth and directionally consistent, and avoid the reflection warping the badge's geometry or the highlight snapping instantly from one side to the other.",
          "bestFor": "Premium branding shots used as short cutaways in luxury or performance car edits."
        },
        {
          "id": "charging-port-reveal-ev",
          "title": "Charging Port Reveal (EV)",
          "text": "Start with the charging port door closed on the vehicle's exterior, static. The port door releases and swings or slides open smoothly, revealing the charging socket as a subtle indicator light inside begins to pulse gently. Keep the door's motion mechanically consistent with a hinge or sliding mechanism, and avoid the indicator light strobing rapidly or the port's internal geometry shifting between frames.",
          "bestFor": "EV-specific feature shots highlighting charging technology and modern design details."
        }
      ],
      "suitableFor": "Opening or closing hero shots in a car ad establishing the vehicle in motion.; Performance-focused detail cutaways emphasizing rims, brakes, or tire tread."
    },
    {
      "id": "urban-street-lifestyle",
      "num": 15,
      "name": "Urban, Street & Lifestyle",
      "shortName": "Urban",
      "group": "vertical",
      "icon": "fa-city",
      "hue": 260,
      "desc": "Street energy, café life, city rhythm.",
      "intro": "For bringing city and street-life photography to life - crowds, traffic, neon, and everyday ambient motion. Paste one of these alongside your urban or lifestyle photo to add believable, subtle movement without turning the scene into chaos.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "crowd-flow-through-frame",
          "title": "Crowd Flow Through Frame",
          "text": "Start with pedestrians positioned as shown in the source image, mid-stride but still. Figures in the mid-ground and background begin walking at a natural, varied pace, crossing the frame in different directions while the foreground subject or focal point remains fixed and sharp. Keep individual figures' proportions and clothing consistent as they move, and avoid any figure merging with another, teleporting between positions, or limbs warping mid-stride.",
          "bestFor": "Busy sidewalk or plaza shots where background life needs to feel candid, not staged."
        },
        {
          "id": "traffic-light-and-street-flow",
          "title": "Traffic Light and Street Flow",
          "text": "Open on a street intersection with the traffic light in its current state, cars stopped or paused. The light transitions smoothly through its sequence (red to green, or yellow to red) as cars begin moving through the intersection in natural lanes, headlights and taillights tracking correctly with each vehicle's direction. Keep every vehicle on its own lane path with no clipping through other cars, and ensure the light change and traffic movement stay synchronized rather than cars moving before the signal logically allows it.",
          "bestFor": "Establishing shots of city intersections used as transition or scene-setting footage."
        },
        {
          "id": "neon-sign-flicker",
          "title": "Neon Sign Flicker",
          "text": "Start on a neon or illuminated sign in its base lit or unlit state. The sign's tubes flicker on in an uneven, realistic sequence - a brief stutter or partial glow before settling into a steady, even illumination - with a faint colored glow reflecting onto the nearby wet pavement or window glass. Keep the flicker brief and localized to the sign itself, and avoid the glow bleeding unnaturally across the whole scene or the sign's shape distorting during the flicker.",
          "bestFor": "Nighttime storefront, bar, or alleyway shots needing a moody, cinematic ignition moment."
        },
        {
          "id": "ambient-street-life-loop",
          "title": "Ambient Street Life Loop",
          "text": "Begin on a street scene exactly as framed, mostly static. Small, subtle background movements activate gradually - a shop awning rippling faintly in the breeze, a distant pedestrian crossing, a bicycle rolling through the far background - while the main subject and foreground stay completely still. Keep all background motion secondary and low-contrast in speed and scale, and avoid any single element drawing focus away from the main subject through erratic or oversized movement.",
          "bestFor": "Lifestyle portraits or café shots where the subject stays still but the world quietly continues around them."
        },
        {
          "id": "city-skyline-at-dusk-lights-turning-on",
          "title": "City Skyline at Dusk, Lights Turning On",
          "text": "Start on the skyline in late dusk light, most windows and building lights dark. Lights begin switching on gradually across the skyline in a scattered, uneven pattern rather than all at once, as the sky's ambient color deepens slightly from dusk toward night. Keep the skyline's silhouette and building shapes completely fixed, and avoid lights strobing on and off repeatedly or the sky color shifting in obvious, hard-edged bands.",
          "bestFor": "Establishing or closing shots that need to signal \"day turning into night\" in a single clip."
        },
        {
          "id": "caf-window-lifestyle-ambience",
          "title": "Café Window Lifestyle Ambience",
          "text": "Open on a café scene viewed from outside or within, subject seated still. Steam rises gently from a cup on the table, a page of a book or newspaper turns softly, and passersby move faintly blurred in the window reflection or background. Keep the main subject's pose and expression unchanged throughout, and ensure background reflections move independently of and slower than any foreground element to preserve depth.",
          "bestFor": "Cozy lifestyle or editorial shots emphasizing a slow, relaxed atmosphere."
        },
        {
          "id": "subway-or-train-arrival",
          "title": "Subway or Train Arrival",
          "text": "Start on an empty or waiting platform, static. A train's headlight appears in the distance and grows larger as it approaches, slowing with a visible deceleration before coming to a stop, followed by doors sliding open smoothly. Keep the train's approach speed decreasing naturally rather than stopping abruptly, and make sure the doors' opening motion is mechanically smooth with no clipping through the train's body.",
          "bestFor": "Transit or commuter-themed shots used as a scene transition or opening beat."
        },
        {
          "id": "crosswalk-pause-and-go",
          "title": "Crosswalk Pause-and-Go",
          "text": "Open on a crosswalk with pedestrians paused at the curb, static. The signal changes, and the group steps off the curb together, walking at slightly varied paces across the street as background traffic remains correctly stopped at the line. Keep each pedestrian's stride natural and independent, and avoid the group moving in an identical, synchronized pattern that would read as looped or artificial.",
          "bestFor": "Wide street-level shots capturing everyday city rhythm and pedestrian energy."
        },
        {
          "id": "rooftop-or-balcony-city-view-ambience",
          "title": "Rooftop or Balcony City View Ambience",
          "text": "Start on a rooftop or balcony vantage point overlooking the city, static foreground subject or furniture. Distant city lights twinkle faintly, a light breeze moves any visible fabric (curtains, umbrella edges, plants) in the foreground, and a bird or two may cross the distant sky. Keep the foreground elements' base position anchored with only fabric or foliage edges moving, and avoid the skyline itself shifting position or perspective during the shot.",
          "bestFor": "Evening lifestyle or hospitality shots (rooftop bars, hotel balconies) selling atmosphere."
        },
        {
          "id": "market-or-vendor-stall-ambience",
          "title": "Market or Vendor Stall Ambience",
          "text": "Open on a street market stall with goods displayed as shown, static. A vendor's hands move subtly in the background arranging produce, fabric awnings sway slightly overhead, and distant shoppers drift past out of focus. Keep the displayed goods in the foreground completely fixed in position and shape, and avoid background figures moving at a speed inconsistent with a relaxed market pace.",
          "bestFor": "Food market, flea market, or artisan stall shots needing lived-in, authentic motion."
        },
        {
          "id": "rain-slicked-street-reflection-walk",
          "title": "Rain-Slicked Street Reflection Walk",
          "text": "Start on a wet city street reflecting ambient lights, empty or with a distant figure. A pedestrian walks through the mid-ground, their reflection rippling faintly and consistently in the wet pavement beneath them as they move, while neon or streetlamp reflections shimmer subtly with each step's disturbance. Keep the reflection's distortion physically tied to the pedestrian's position, and avoid the reflection detaching from or lagging noticeably behind the real figure above it.",
          "bestFor": "Moody, cinematic night-street shots emphasizing texture and atmosphere over action."
        },
        {
          "id": "bus-stop-or-curb-wait-ambience",
          "title": "Bus Stop or Curb Wait Ambience",
          "text": "Open on a person waiting at a curb or bus stop, static pose. Their weight shifts subtly, hair or clothing moves faintly in the breeze, and a bus or car passes through the background at a natural speed before the scene settles again. Keep the waiting figure's core position anchored in place throughout, and avoid any passing vehicle's speed or lighting appearing inconsistent with the rest of the static scene.",
          "bestFor": "Everyday commuter or lifestyle portraits needing a naturalistic, unposed feel."
        }
      ],
      "suitableFor": "Busy sidewalk or plaza shots where background life needs to feel candid, not staged.; Establishing shots of city intersections used as transition or…"
    },
    {
      "id": "abstract-transitions",
      "num": 16,
      "name": "Abstract & Transition Effects",
      "shortName": "Abstract",
      "group": "atmosphere",
      "icon": "fa-shuffle",
      "hue": 280,
      "desc": "Morphs, wipes, glitch - stylistic transitions.",
      "intro": "For creating clean transition and effect clips that connect two images, styles, or scenes - the kind of polish used between shots in a reel or ad. Paste one of these when you want a stylized effect rather than literal, real-world motion.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "morph-transition-between-two-states",
          "title": "Morph Transition Between Two States",
          "text": "Start on the first image exactly as provided, fully in focus and still. The image gradually reshapes and blends into the second target state, with edges and forms flowing smoothly into their new positions as colors and shapes cross-dissolve in step with the structural change. End fully settled on the second state with no residual ghosting from the first. Keep the transformation gradual and continuous throughout its full duration, and avoid any mid-transition freeze, snap, or double-exposure artifact where both states appear overlapping and static at once.",
          "bestFor": "Before/after reveals, product variant swaps, or style-change transitions between two related images."
        },
        {
          "id": "particle-dissolve-effect",
          "title": "Particle Dissolve Effect",
          "text": "Begin on the source image fully intact and sharp. The image begins breaking apart from one edge or region into countless small particles that drift outward and upward, thinning in density as they travel until the frame is left empty or reveals the next scene underneath. Keep the particle density decreasing gradually and consistently across the dissolve, and avoid particles reforming, reversing direction, or clumping into unnatural solid chunks partway through.",
          "bestFor": "Dramatic scene-ending transitions or reveals where a subject \"disintegrates\" into the next shot."
        },
        {
          "id": "light-leak-transition-sweep",
          "title": "Light-Leak Transition Sweep",
          "text": "Start on the source image in its normal exposure and color. A warm, translucent streak of light sweeps diagonally across the frame from one corner, briefly overexposing the area it passes over before fading and revealing the frame clean again (or transitioning into a second image beneath the sweep). Keep the light leak's brightness and speed consistent as it crosses, and avoid it snapping on and off abruptly or bleaching out identifiable details for longer than the brief pass-through moment.",
          "bestFor": "Nostalgic, film-style transitions between two clips or as a soft scene-opening effect."
        },
        {
          "id": "smooth-color-grade-shift",
          "title": "Smooth Color Grade Shift",
          "text": "Begin on the source image in its original color grade, static composition. The overall color tone shifts gradually - for example from cool and desaturated to warm and vibrant, or from natural to a stylized cinematic grade - with the shift spreading evenly across the whole frame rather than in patches. Keep the underlying image content, shapes, and composition completely unchanged throughout, and avoid any banding, patchy color pooling, or one area of frame changing tone faster than the rest.",
          "bestFor": "Mood-setting transitions, day-to-night reinterpretations, or brand-consistent color transitions between scenes."
        },
        {
          "id": "ink-or-paint-bloom-effect",
          "title": "Ink or Paint Bloom Effect",
          "text": "Start on a clean, static base image or plain background. A drop of ink or paint appears at a chosen point and blooms outward in organic, branching tendrils that curl and spread through the frame, gradually revealing or coloring the image beneath as the bloom expands. Keep the bloom's expansion physically fluid-like, thinning and slowing as it spreads, and avoid the ink pattern repeating identically, moving in hard geometric lines, or filling the frame instantaneously.",
          "bestFor": "Artistic reveals, logo intros, or transitions needing an organic, painterly feel rather than a hard cut."
        },
        {
          "id": "glitch-style-digital-transition",
          "title": "Glitch-Style Digital Transition",
          "text": "Begin on the source image stable and clean. Brief, controlled digital artifacts - thin horizontal tears, RGB channel splits, and quick static flickers - pulse across the frame for a short burst before resolving cleanly into the next image or back to a stable frame. Keep the glitch burst short and confined to one or two quick pulses, and avoid letting the distortion run long enough to obscure the subject entirely or make the transition feel like a rendering error rather than a stylistic choice.",
          "bestFor": "High-energy tech, gaming, or music-adjacent content wanting an intentional digital-glitch transition."
        },
        {
          "id": "soft-blur-to-focus-reveal",
          "title": "Soft Blur-to-Focus Reveal",
          "text": "Start on the frame heavily soft-focused, shapes and colors readable only as general forms. The image gradually sharpens over the duration, detail resolving smoothly from the center outward (or evenly across frame) until the final image is crisply in focus. Keep the sharpening curve smooth and continuous, and avoid the focus pulling in and out repeatedly or resolving unevenly in a way that makes one region sharp while an adjacent area remains inexplicably blurred.",
          "bestFor": "Elegant opening reveals or product unveils where clarity itself is the payoff."
        },
        {
          "id": "liquid-wipe-transition",
          "title": "Liquid Wipe Transition",
          "text": "Open on the first image, static. A wave-like liquid distortion rolls across the frame from one side to the other, rippling and refracting the image beneath it as it passes, leaving the second image revealed cleanly in its wake. Keep the ripple's wave shape consistent and moving in a single direction at a steady pace, and avoid the distortion warping permanent features of the final revealed image or leaving behind residual ripple artifacts after the wipe completes.",
          "bestFor": "Smooth scene-to-scene transitions in product or fashion reels wanting a fluid, premium feel."
        },
        {
          "id": "zoom-through-transition",
          "title": "Zoom-Through Transition",
          "text": "Start on the source image at its normal framing. The camera pushes rapidly toward a specific point in the frame (a doorway, an object, a patch of texture), the view accelerating until the frame is filled by that point, then continuing through into the next scene as if passing through it. Keep the acceleration smooth and continuous without sudden speed jumps, and avoid the destination scene appearing before the zoom has fully completed its push-through.",
          "bestFor": "High-energy scene transitions connecting two related spaces or moments, common in trailers and reels."
        },
        {
          "id": "shatter-and-reform-effect",
          "title": "Shatter and Reform Effect",
          "text": "Begin on the source image intact and static. The image fractures into angular shard-like pieces that separate slightly and drift apart along varied trajectories, then reverse and reassemble smoothly into a second image occupying the same shard pattern. Keep the shard edges sharp and consistent in count and shape between the break and the reform, and avoid pieces overlapping illogically, changing shape mid-flight, or reforming into a different arrangement than they broke from.",
          "bestFor": "Bold, stylized transitions for tech, sports, or gaming content needing high visual impact."
        },
        {
          "id": "fade-through-white-or-black",
          "title": "Fade Through White or Black",
          "text": "Start on the source image at full visibility and normal exposure. The frame gradually brightens to pure white (or darkens to pure black), the image's detail dissolving evenly as the tone overtakes it, before the second image emerges from the same flat tone back into full visibility. Keep the fade timing symmetrical and even across the whole frame, and avoid any part of the image resisting the fade and remaining visible after the rest of the frame has reached full white or black.",
          "bestFor": "Clean, minimal transitions between unrelated scenes or as a chapter break in longer edits."
        },
        {
          "id": "depth-push-parallax-reveal",
          "title": "Depth Push Parallax Reveal",
          "text": "Open on the source image with its natural foreground and background layers as shot. The camera pushes slowly forward, causing foreground elements to shift and enlarge faster than the background, creating a layered parallax effect that adds a sense of three-dimensional depth before settling on a new framing closer to the subject. Keep the parallax separation proportional and consistent with each layer's implied distance, and avoid flat elements appearing to bend, curve, or peel as the depth effect is applied.",
          "bestFor": "Adding cinematic dimensionality to a single flat photo as an opening or transition shot."
        }
      ],
      "suitableFor": "Before/after reveals, product variant swaps, or style-change transitions between two related images.; Dramatic scene-ending transitions or reveals where a…"
    },
    {
      "id": "sports-action",
      "num": 17,
      "name": "Sports & Action",
      "shortName": "Sports",
      "group": "vertical",
      "icon": "fa-person-running",
      "hue": 10,
      "desc": "Athletic wind-up, slow-mo peaks, action highlights.",
      "intro": "Prompts for bringing still sports and action photos to life - the explosive kickoffs, mid-air peaks, and follow-through moments that make a frozen shot feel like it was captured a split second from real motion.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "freeze-frame-to-motion-kickoff",
          "title": "Freeze-Frame-to-Motion Kickoff",
          "text": "The scene starts exactly as photographed, athlete and ball or object held in the static pre-action pose, then motion begins abruptly as the kickoff or opening movement launches forward with a sudden burst of speed, settling into a continuous action sequence by the end of the clip. The initial release from stillness should feel like a held breath finally let go, not a slow creep into movement. Guard against the ball, puck, or object leaving a ghost trail or duplicating as it separates from the athlete's body.",
          "bestFor": "Opening shots of a match, race, or play that need to snap from a posed still into live action."
        },
        {
          "id": "slow-motion-impact-moment",
          "title": "Slow-Motion Impact Moment",
          "text": "Starting from the instant just before contact as photographed, the clip stretches that single moment into slowed motion, showing the collision, strike, or impact unfold gradually with visible compression and displacement of the point of contact before the frame settles into the aftermath. The slow-motion pacing should stay uniform throughout rather than randomly speeding up. Avoid letting the impacting surfaces merge, clip through each other, or fuse into a single warped shape at the moment of contact.",
          "bestFor": "Boxing, tackles, bat-on-ball, or any single dramatic point-of-contact photo needing cinematic slow-motion weight."
        },
        {
          "id": "athletic-wind-up-and-release",
          "title": "Athletic Wind-Up and Release",
          "text": "The athlete starts in the coiled wind-up position exactly as photographed, then rotates and uncoils through the throw, swing, or kick, ending on full extension with the arm, bat, or leg fully released by the end of the clip. The rotation should follow one continuous kinetic chain, hips leading before shoulders and the striking limb following last. Guard against the throwing or swinging limb warping, elongating unnaturally, or briefly duplicating mid-rotation.",
          "bestFor": "Pitching, golf swings, tennis serves, or martial arts strikes captured at the top of the wind-up."
        },
        {
          "id": "sprint-start-burst",
          "title": "Sprint Start Burst",
          "text": "Starting from the crouched blocks or standing-start position as photographed, the athlete explodes forward with a low, driving first stride, arms pumping in counter-rotation to the legs, body angle gradually rising from a forward lean toward upright by the end of the clip. The acceleration should build progressively rather than reaching full speed instantly. Avoid the legs blurring into an indistinct smear or multiplying into extra limbs during the fastest part of the stride.",
          "bestFor": "Track starts, swimming blocks, or any race-beginning photo needing an explosive first-motion feel."
        },
        {
          "id": "mid-air-jump-peak-to-landing",
          "title": "Mid-Air Jump Peak-to-Landing",
          "text": "The clip starts with the athlete already at the peak of the jump as photographed, body suspended and weightless, then gravity pulls them downward through a controlled descent into a stable landing with knees bending to absorb impact by the end of the clip. The fall should follow a natural acceleration curve, slow near the peak and quickening on the way down. Guard against the landing legs buckling into an impossible angle or the ground plane warping on contact.",
          "bestFor": "Basketball dunks, high jump, gymnastics, or skate tricks photographed at their highest point."
        },
        {
          "id": "follow-through-after-a-shot",
          "title": "Follow-Through After a Shot",
          "text": "Starting from the moment of release as photographed, ball or object already departed, the athlete's body continues its natural follow-through arc, the striking limb decelerating and the torso settling into balance by the end of the clip. The follow-through should read as the tail end of one fluid motion, not a separate new movement. Avoid the ball or object snapping back into frame or the limb reversing direction unnaturally as it slows.",
          "bestFor": "Free throws, penalty kicks, archery releases, or any shot photographed just after the ball has left the athlete."
        },
        {
          "id": "crowd-reaction-energy-burst",
          "title": "Crowd-Reaction Energy Burst",
          "text": "The scene starts on a crowd holding a tense, anticipatory pose as photographed, then erupts into motion as arms raise, mouths open in cheering, and bodies surge forward slightly with the excitement of a scored point, settling into a sustained celebratory energy by the end of the clip. The eruption should ripple outward from the point of focus rather than every figure moving in perfect unison. Guard against faces in the crowd blurring into indistinct smears or limbs multiplying across densely packed rows.",
          "bestFor": "Stadium or arena crowd shots meant to capture the instant a game-winning moment lands."
        },
        {
          "id": "victory-pose-settling",
          "title": "Victory Pose Settling",
          "text": "Starting from the peak triumphant pose as photographed, arms raised or fists clenched, the athlete's body eases slightly out of the extreme pose into a more relaxed but still jubilant stance, chest rising and falling with heavy breathing by the end of the clip. The settle should be gentle and controlled, not a sudden collapse. Avoid the raised arms twitching or snapping between positions instead of easing smoothly downward.",
          "bestFor": "Post-win celebration photos meant to breathe naturally after the initial victory freeze-frame."
        },
        {
          "id": "defensive-block-or-save-reaction",
          "title": "Defensive Block or Save Reaction",
          "text": "The scene starts with the defender or goalkeeper mid-dive or mid-reach as photographed, body fully extended toward the ball, then completes the motion with the block or save connecting and the body continuing its momentum into a roll or skid across the surface by the end of the clip. The momentum after contact should follow through naturally rather than stopping dead. Guard against the diving body clipping through the ground plane or the ball passing through the blocking limb without visible deflection.",
          "bestFor": "Goalkeeper saves, blocked shots, or diving defensive plays frozen at the moment of full extension."
        },
        {
          "id": "trail-running-stride-cycle",
          "title": "Trail Running Stride Cycle",
          "text": "Starting from a single mid-stride pose on a trail or track as photographed, the runner's legs and arms cycle through one to two natural running strides, terrain passing beneath at a matched pace, before settling back into a stable running rhythm by the end of the clip. The stride cycle should stay biomechanically consistent, same cadence and stride length throughout. Avoid the runner's feet sliding or skating across the ground without proper foot-strike contact.",
          "bestFor": "Trail races, marathons, or outdoor endurance shots needing a believable repeating running motion."
        },
        {
          "id": "skateboard-or-bike-trick-rotation",
          "title": "Skateboard or Bike Trick Rotation",
          "text": "The rider starts mid-air in the trick pose as photographed, board or bike already rotating, then completes the remaining rotation and levels out for landing, wheels touching down with a slight compression by the end of the clip. The rotation speed should stay constant through the airborne portion before slowing naturally into the landing. Guard against the board or bike separating from the rider's feet or hands mid-rotation and snapping back into place.",
          "bestFor": "Skate parks, BMX, or freestyle trick photos frozen mid-spin or mid-flip."
        },
        {
          "id": "post-race-exhaustion-beat",
          "title": "Post-Race Exhaustion Beat",
          "text": "Starting from the finish-line pose as photographed, body still leaning into the final stride, the athlete decelerates into a stumbling slow-down, shoulders dropping and chest heaving with exhausted breathing by the end of the clip. The deceleration should feel like momentum bleeding off gradually, not an abrupt stop. Avoid the athlete's stumbling steps warping their leg proportions or causing a foot to phase through the track surface.",
          "bestFor": "Finish-line photos wanting to show the raw physical toll immediately after crossing the line."
        }
      ],
      "suitableFor": "Opening shots of a match, race, or play that need to snap from a posed still into live action.; Boxing, tackles, bat-on-ball, or any single dramatic…"
    },
    {
      "id": "pet-animal-motion",
      "num": 18,
      "name": "Pet & Animal Motion",
      "shortName": "Pets",
      "group": "vertical",
      "icon": "fa-paw",
      "hue": 35,
      "desc": "Ears, tail, playful motion for animals.",
      "intro": "Prompts for turning still pet and wildlife photos into short, believable bursts of natural animal behavior - the tail wags, stretches, and alert-to-relaxed shifts that make a portrait feel like a living moment rather than a snapshot.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "dog-tail-wag-and-ear-perk",
          "title": "Dog Tail Wag and Ear Perk",
          "text": "The dog starts in the exact seated or standing pose as photographed, then the tail begins swinging side to side in a loose, relaxed rhythm while the ears lift and rotate slightly forward as though catching a sound, settling into a steady happy wag by the end of the clip. The tail motion should follow a natural pendulum swing rather than a rigid mechanical back-and-forth. Guard against a second tail or extra ear appearing at the edges of the motion blur.",
          "bestFor": "Everyday dog portraits wanting a warm, alert, happy-to-see-you feel."
        },
        {
          "id": "cat-stretch-and-yawn",
          "title": "Cat Stretch and Yawn",
          "text": "Starting from the curled or seated pose as photographed, the cat extends its front legs forward into a deep stretch, back arching and spine elongating, before the jaw opens into a slow yawn and the body settles back into a relaxed resting position by the end of the clip. The stretch should move through the spine in one continuous curve rather than snapping between poses. Avoid the legs or paws warping in length or gaining extra toes as they extend into the stretch.",
          "bestFor": "Calm cat portraits, waking-up moments, or cozy lifestyle shots."
        },
        {
          "id": "playful-pounce",
          "title": "Playful Pounce",
          "text": "The animal starts in a low, crouched pre-pounce stance as photographed, weight shifted back and haunches loaded, then launches forward in a quick, springing pounce toward an implied target just out of frame, front paws landing first before the body follows through by the end of the clip. The launch should carry real spring and weight, not a floaty glide. Guard against the animal's body stretching into an impossibly elongated shape mid-leap.",
          "bestFor": "Kittens or puppies photographed crouched and ready to play, wanting energetic motion."
        },
        {
          "id": "dog-galloping-run",
          "title": "Dog Galloping Run",
          "text": "Starting from a single mid-stride running pose as photographed, the dog's legs cycle through one or two full gallop strides, ground passing beneath at a matched pace, ears and jowls flapping loosely with the motion, before settling into a consistent running rhythm by the end of the clip. The gait should follow a believable four-beat gallop pattern rather than legs moving in a blurred jumble. Avoid extra legs appearing or the dog's paws sliding across the ground without real contact.",
          "bestFor": "Action shots of dogs running on beaches, fields, or trails."
        },
        {
          "id": "horse-galloping-motion",
          "title": "Horse Galloping Motion",
          "text": "The horse starts in a mid-gallop pose as photographed, then the legs continue through the natural gallop cycle, mane and tail streaming with the motion, muscles rippling along the flank, before settling into a steady sustained gallop by the end of the clip. The leg sequencing should follow correct equine gait mechanics, never all four legs striking or leaving the ground at the same instant. Guard against the mane or tail freezing into a static shape while the body continues moving.",
          "bestFor": "Equestrian or wildlife-style horse photos captured mid-run needing convincing continued motion."
        },
        {
          "id": "bird-taking-flight",
          "title": "Bird Taking Flight",
          "text": "Starting from the perched or standing pose as photographed, the bird crouches slightly and pushes off with a powerful downward wing beat, lifting into the air as the legs tuck and the wings continue beating in a steady rhythm by the end of the clip. The initial push-off should show real ground reaction force before the bird becomes airborne. Avoid the wings warping into an uneven number of feathers or merging into a blurred smear during the beats.",
          "bestFor": "Birds photographed perched or grounded, wanting a dynamic launch-into-flight moment."
        },
        {
          "id": "animal-head-tilt-curiosity",
          "title": "Animal Head Tilt Curiosity",
          "text": "The animal starts facing forward in the pose as photographed, then tilts its head slowly to one side in a curious, listening gesture, ears adjusting slightly with the tilt, before returning the head to a centered, attentive position by the end of the clip. The tilt should move at a natural, unhurried pace as though genuinely processing a sound. Guard against the head rotating past a natural range of motion or the neck appearing to twist unnaturally.",
          "bestFor": "Close-up pet portraits wanting a charming, relatable curious reaction."
        },
        {
          "id": "sleepy-settle-down",
          "title": "Sleepy Settle-Down",
          "text": "Starting from an alert or sitting pose as photographed, the animal's eyelids grow heavy and begin to droop, the body gradually lowering and curling into a resting position, breathing slowing into a gentle rise and fall by the end of the clip. The transition into rest should be slow and heavy, matching real drowsiness rather than an abrupt collapse. Avoid the body shrinking or growing in overall size as it settles into the curled position.",
          "bestFor": "End-of-day pet photos or calm, cozy content wanting a gentle wind-down feel."
        },
        {
          "id": "wildlife-alert-to-relaxed-shift",
          "title": "Wildlife Alert-to-Relaxed Shift",
          "text": "The animal starts in a tense, alert stance as photographed, ears up and body rigid, scanning for a perceived threat, then gradually eases as the perceived danger passes, muscles relaxing and posture lowering into a calm stance by the end of the clip. The release of tension should move through the whole body gradually, shoulders first, then head, then stance. Guard against the animal's legs repositioning in a way that skips or teleports between stances rather than shifting continuously.",
          "bestFor": "Wildlife photography of deer, rabbits, or similar prey animals caught in a moment of vigilance."
        },
        {
          "id": "puppy-or-kitten-head-bob-play",
          "title": "Puppy or Kitten Head Bob Play",
          "text": "Starting from a still, watching pose as photographed, the young animal's head bobs and weaves slightly as it tracks an imaginary moving object, front paws shifting weight in anticipation, before pouncing slightly forward and settling back by the end of the clip. The head and paw movements should stay small and playful rather than escalating into a full sprint. Avoid the eyes appearing to detach from tracking motion or drifting out of alignment with the head.",
          "bestFor": "Playful kitten or puppy photos wanting subtle, charming pre-play motion."
        },
        {
          "id": "bird-preening-and-feather-ruffle",
          "title": "Bird Preening and Feather Ruffle",
          "text": "The bird starts perched in the still pose as photographed, then tilts its head down toward its wing, feathers ruffling and resettling in a light shake before the bird returns to an upright, groomed posture by the end of the clip. The feather ruffle should look like individual feathers lifting and dropping back into place, not a uniform blur. Guard against the beak clipping through the wing or feathers vanishing and reappearing between frames.",
          "bestFor": "Perched bird portraits wanting a naturalistic grooming moment rather than static stillness."
        },
        {
          "id": "farm-animal-grazing-shift",
          "title": "Farm Animal Grazing Shift",
          "text": "Starting from a grazing or standing pose in a field as photographed, the animal takes a slow step forward, head dipping to graze before lifting again to look around, tail flicking gently against flies by the end of the clip. The stepping motion should carry real weight and hoof placement rather than sliding across the ground. Avoid the tail multiplying into extra motion trails or the legs bending at unnatural joint angles.",
          "bestFor": "Pastoral farm photos of cows, sheep, or goats wanting quiet, believable grazing motion."
        }
      ],
      "suitableFor": "Everyday dog portraits wanting a warm, alert, happy-to-see-you feel.; Calm cat portraits, waking-up moments, or cozy lifestyle shots."
    },
    {
      "id": "wedding-event",
      "num": 19,
      "name": "Wedding & Event",
      "shortName": "Wedding",
      "group": "vertical",
      "icon": "fa-heart",
      "hue": 350,
      "desc": "Ceremony beats, couple moments, event energy.",
      "intro": "Prompts for turning still wedding and celebration photos into gentle, emotionally warm motion clips - the slow turns, glinting details, and candid reactions that make a captured moment feel like it's still unfolding.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "first-dance-slow-turn",
          "title": "First Dance Slow Turn",
          "text": "The couple starts in the exact holding pose as photographed, then rotates slowly together in a smooth, unhurried turn, fabric of the dress or gown swaying gently with the motion before settling back near the original framing by the end of the clip. The turn should move at a single consistent rotational speed with no sudden pivots. Guard against the couple's joined hands separating and reconnecting oddly or limbs warping as bodies rotate past the camera angle.",
          "bestFor": "First dance photos wanting a romantic, continuous turning motion rather than a static hold."
        },
        {
          "id": "ring-close-up-with-light-glint",
          "title": "Ring Close-Up with Light Glint",
          "text": "Starting from the still close-up of the ring as photographed, the hand tilts slightly, catching the light so a soft glint travels across the metal and any gemstone facets, before settling back into a steady, well-lit resting position by the end of the clip. The glint should move naturally across the surface as the angle changes, not flash on and off randomly. Avoid reflections flickering unnaturally or the ring's band appearing to warp or resize as it catches the light.",
          "bestFor": "Ring detail shots meant to add sparkle and life to an otherwise static macro photo."
        },
        {
          "id": "toast-raising-moment",
          "title": "Toast-Raising Moment",
          "text": "The scene starts with glasses held at chest height as photographed, then arms lift together in a smooth raising motion, glasses meeting in a light clink near the top of the frame, before lowering slightly to a natural resting toast position by the end of the clip. The raise should be unified in timing across everyone in the shot, not staggered unnaturally. Guard against the glasses passing through each other at the clink or liquid inside sloshing out unnaturally.",
          "bestFor": "Group toast photos at receptions, rehearsal dinners, or engagement celebrations."
        },
        {
          "id": "walking-down-the-aisle-reveal",
          "title": "Walking Down the Aisle Reveal",
          "text": "Starting from the framed pose at the top of the aisle as photographed, the figure takes slow, deliberate steps forward, veil or train trailing softly behind with each step, the background of seated guests and floral arrangements resolving into sharper focus by the end of the clip. The walking pace should stay even and ceremonial, never rushed. Avoid the legs sliding beneath the gown without visible footfall or the train dragging in a way that clips through the floor.",
          "bestFor": "Bridal entrance or processional photos wanting a slow, reverent walking reveal."
        },
        {
          "id": "candid-crowd-laughter-reaction",
          "title": "Candid Crowd Laughter Reaction",
          "text": "The guests start in a mid-laugh pose as photographed, then the laughter continues naturally, heads tilting back slightly, shoulders shaking, hands rising to cover mouths, before easing into a relaxed smiling settle by the end of the clip. The laughter should ripple through the group with slightly varied timing per person rather than everyone moving in unison. Guard against faces distorting into exaggerated expressions or teeth warping as mouths open and close.",
          "bestFor": "Candid reception photos capturing genuine guest reactions and shared joy."
        },
        {
          "id": "cake-cutting-moment",
          "title": "Cake-Cutting Moment",
          "text": "Starting from the knife poised at the top of the cake as photographed, the couple's hands guide the blade down together in one smooth cutting motion, the slice separating cleanly before both look up toward each other or the camera by the end of the clip. The cutting motion should carry believable resistance and pressure through the cake's layers. Avoid the frosting smearing unnaturally across the knife or the cake's layers warping out of alignment as the cut completes.",
          "bestFor": "Cake-cutting photos wanting the satisfying completion of the cut rather than a frozen pre-cut moment."
        },
        {
          "id": "bouquet-toss-arc",
          "title": "Bouquet Toss Arc",
          "text": "The scene starts with the bouquet held overhead mid-toss as photographed, then releases into a soft arcing flight through the air, flowers rotating gently, guests below reaching upward with anticipation, before the bouquet reaches the peak of its arc by the end of the clip. The arc should follow a natural gravity-driven curve, rising then beginning to fall. Guard against the bouquet's shape distorting mid-flight or petals detaching and multiplying unnaturally as it spins.",
          "bestFor": "Bouquet toss photos wanting to capture the suspended, joyful peak of the throw."
        },
        {
          "id": "veil-or-dress-movement-in-a-breeze",
          "title": "Veil or Dress Movement in a Breeze",
          "text": "Starting from the still portrait pose as photographed, the veil or dress fabric lifts and ripples gently as though caught by a soft breeze, settling back down into a natural drape by the end of the clip. The fabric movement should follow soft, wave-like folds rather than rigid flapping. Avoid the fabric clipping through the body or limbs, or the veil detaching entirely from where it's pinned.",
          "bestFor": "Bridal portrait shots wanting soft environmental movement to add romance and atmosphere."
        },
        {
          "id": "first-look-emotional-reaction",
          "title": "First Look Emotional Reaction",
          "text": "The partner starts in the moment of first seeing the other as photographed, hand rising toward the mouth or chest in surprise, eyes beginning to well up, before easing into a soft, joyful smile by the end of the clip. The emotional shift should build gradually from shock into warmth rather than snapping between expressions. Guard against tears appearing as a static glossy overlay rather than following the contour of the face naturally.",
          "bestFor": "First look photos wanting to extend the raw emotional beat of the reveal."
        },
        {
          "id": "flower-girl-or-ring-bearer-candid-motion",
          "title": "Flower Girl or Ring Bearer Candid Motion",
          "text": "Starting from the still pose walking down the aisle as photographed, the child takes a few small, slightly uneven steps forward, petals or the ring pillow swaying gently in their hands, head turning briefly to look at the crowd before continuing forward by the end of the clip. The steps should carry the natural unevenness of a child's gait rather than a smooth adult stride. Avoid the child's proportions shifting or limbs warping as they move through frame.",
          "bestFor": "Candid flower girl or ring bearer shots wanting charming, imperfect motion."
        },
        {
          "id": "reception-dance-floor-energy",
          "title": "Reception Dance Floor Energy",
          "text": "The scene starts with guests mid-dance-move as photographed, then bodies continue swaying and moving to an implied beat, arms raised and hips shifting in loose rhythm, before settling into a sustained dancing energy by the end of the clip. The movement should feel loose and slightly asynchronous across different guests rather than choreographed. Guard against limbs merging between close-standing dancers or extra arms appearing in densely packed groups.",
          "bestFor": "Reception dance floor photos wanting to convey ongoing party energy rather than a frozen pose."
        },
        {
          "id": "groom-s-nervous-wait-at-the-altar",
          "title": "Groom's Nervous Wait at the Altar",
          "text": "Starting from the still standing pose at the altar as photographed, the groom shifts his weight slightly, adjusts his jacket or tie, and glances toward the aisle entrance with a mix of nerves and anticipation, before settling into a composed, expectant stance by the end of the clip. The fidgeting should stay small and restrained, true to the formality of the moment. Avoid the hands or jacket fabric warping during the adjustment gesture.",
          "bestFor": "Pre-ceremony photos of the groom waiting, wanting subtle, humanizing motion."
        }
      ],
      "suitableFor": "First dance photos wanting a romantic, continuous turning motion rather than a static hold.; Ring detail shots meant to add sparkle and life to an otherwise…"
    },
    {
      "id": "fitness-wellness",
      "num": 20,
      "name": "Fitness & Wellness",
      "shortName": "Fitness",
      "group": "vertical",
      "icon": "fa-dumbbell",
      "hue": 145,
      "desc": "Workout motion, breath, motivation clips.",
      "intro": "Prompts for turning still workout and wellness photos into short, believable clips of effort and recovery - the reps, flows, and breathing moments that make a fitness shot feel like real motion caught mid-session.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "workout-rep-motion-lifting",
          "title": "Workout Rep Motion (Lifting)",
          "text": "The lifter starts at the bottom of the movement exactly as photographed, weight held at the lowest point of the rep, then drives upward through a controlled lifting motion, muscles visibly engaging and straining, before reaching full extension at the top by the end of the clip. The lift should show real effort and slight deceleration near the top, not a frictionless glide. Guard against the barbell or dumbbell warping in length or the lifter's grip appearing to phase through the bar.",
          "bestFor": "Strength training photos captured at the bottom of a squat, deadlift, or press."
        },
        {
          "id": "workout-rep-motion-pressing",
          "title": "Workout Rep Motion (Pressing)",
          "text": "Starting from the racked position at the chest or shoulders as photographed, the athlete presses the weight upward along a controlled, straight path, arms extending fully and locking out, before beginning a slow, controlled lower back toward the starting position by the end of the clip. The press and the return should each maintain a single steady speed without jerky pauses. Avoid the weight plates flexing or the arms elongating unnaturally at full extension.",
          "bestFor": "Bench press, overhead press, or shoulder press photos wanting a full press-and-return rep cycle."
        },
        {
          "id": "yoga-pose-transition-flowing-between-two-poses",
          "title": "Yoga Pose Transition (Flowing Between Two Poses)",
          "text": "The practitioner starts in the first yoga pose exactly as photographed, then flows smoothly through a connecting movement, weight shifting through the hands and feet, into a second recognizable pose, settling with control by the end of the clip. The transition should follow one continuous, breath-paced movement rather than a sudden jump between poses. Guard against limbs bending at joints in ways that exceed natural range of motion during the transition.",
          "bestFor": "Yoga sequence photos wanting to show the graceful connective movement between two held poses."
        },
        {
          "id": "stretching-reveal",
          "title": "Stretching Reveal",
          "text": "Starting from a neutral standing or seated pose as photographed, the body extends gradually into a deep stretch, muscles lengthening visibly along the stretched side, breath releasing slowly as the stretch deepens, before holding steady at full extension by the end of the clip. The stretch should deepen gradually rather than snapping immediately to its furthest point. Avoid the stretching limb appearing to detach proportionally from the rest of the body as it extends.",
          "bestFor": "Warm-up or cool-down photos wanting to show a stretch unfolding into its full depth."
        },
        {
          "id": "running-on-a-treadmill",
          "title": "Running on a Treadmill",
          "text": "The runner starts mid-stride on the treadmill as photographed, then legs continue cycling through a consistent running gait, belt visibly moving beneath the feet, arms swinging in counter-rhythm, before settling into a steady sustained pace by the end of the clip. The foot strikes should land in sync with the moving belt rather than sliding or floating above it. Guard against the treadmill belt and the runner's feet moving at mismatched speeds, breaking the illusion of contact.",
          "bestFor": "Gym treadmill photos wanting continuous, rhythmic running motion."
        },
        {
          "id": "running-on-a-trail",
          "title": "Running on a Trail",
          "text": "Starting from a single mid-stride pose on an outdoor trail as photographed, the runner's legs and arms cycle through one or two natural strides, terrain and surrounding foliage passing at a matched pace, before settling back into a steady running rhythm by the end of the clip. The environment should move at a pace consistent with the runner's speed, not drift independently. Avoid the runner's feet sliding across uneven trail terrain without proper ground contact.",
          "bestFor": "Outdoor trail running photos wanting believable forward motion through a natural setting."
        },
        {
          "id": "breathing-and-meditation-stillness",
          "title": "Breathing and Meditation Stillness",
          "text": "The practitioner starts seated in stillness exactly as photographed, then the chest and shoulders rise and fall gently with slow, deliberate breathing, eyelids resting closed or softly lowered, the body otherwise holding steady posture by the end of the clip. The breathing motion should stay subtle and rhythmic, the dominant and nearly only movement in the frame. Guard against the shoulders or head drifting out of the original seated alignment as the breathing cycles.",
          "bestFor": "Meditation or mindfulness photos wanting quiet, almost-imperceptible life rather than full stillness."
        },
        {
          "id": "gym-equipment-in-use-cable-machine",
          "title": "Gym Equipment in Use (Cable Machine)",
          "text": "Starting from the extended arm position at a cable machine as photographed, the athlete pulls the handle through a controlled range of motion, cable visibly moving through the pulley, muscles contracting, before returning slowly to the starting extended position by the end of the clip. The cable and handle should move in exact sync with the arm's pulling motion throughout. Avoid the cable appearing to stretch, snap, or pass through the pulley housing.",
          "bestFor": "Gym equipment photos on cable machines, rows, or pulldown stations wanting a full pull-and-return cycle."
        },
        {
          "id": "gym-equipment-in-use-kettlebell-swing",
          "title": "Gym Equipment in Use (Kettlebell Swing)",
          "text": "The athlete starts at the bottom of the swing with the kettlebell between the legs as photographed, then hips drive forward explosively, swinging the kettlebell upward to shoulder height, before it begins its natural arc back down by the end of the clip. The swing should follow a real pendulum arc powered by the hips, not the arms lifting it directly. Guard against the kettlebell separating from the handle or leaving a duplicated trail during the fastest part of the swing.",
          "bestFor": "Kettlebell or dynamic free-weight photos wanting explosive, momentum-driven motion."
        },
        {
          "id": "post-workout-exhale-settle",
          "title": "Post-Workout Exhale Settle",
          "text": "Starting from a hunched-over, hands-on-knees pose as photographed, the athlete straightens up slowly, chest expanding with a deep inhale, then releasing into a long exhale as shoulders drop and the body relaxes into a standing rest by the end of the clip. The straightening motion should look effortful, like real fatigue is being pushed through. Avoid the athlete's posture straightening too quickly or smoothly for the implied level of exhaustion.",
          "bestFor": "Post-set or post-run recovery photos wanting a believable moment of catching one's breath."
        },
        {
          "id": "bodyweight-push-up-rep",
          "title": "Bodyweight Push-Up Rep",
          "text": "The athlete starts at the bottom of a push-up, chest near the floor as photographed, then pushes upward through a controlled extension of the arms, core staying rigid and straight, before reaching the top plank position by the end of the clip. The body should move as one rigid unit from shoulders to heels throughout the press. Guard against the lower back sagging or arching in ways inconsistent with a stable plank line.",
          "bestFor": "Bodyweight or calisthenics photos captured at the bottom of a push-up rep."
        },
        {
          "id": "cool-down-foam-rolling-motion",
          "title": "Cool-Down Foam Rolling Motion",
          "text": "Starting from a static pose with the foam roller positioned under a muscle group as photographed, the body shifts slowly back and forth, rolling over the roller's surface with visible pressure and slight muscle compression, before settling into a paused, resting position by the end of the clip. The rolling motion should stay slow and controlled, matching real self-massage pacing. Avoid the foam roller warping in shape or sliding out from under the body without matching movement.",
          "bestFor": "Recovery and cool-down photos showing foam rolling or self-myofascial release."
        }
      ],
      "suitableFor": "Strength training photos captured at the bottom of a squat, deadlift, or press.; Bench press, overhead press, or shoulder press photos wanting a full…"
    },
    {
      "id": "music-performance",
      "num": 21,
      "name": "Music & Performance",
      "shortName": "Music",
      "group": "vertical",
      "icon": "fa-music",
      "hue": 270,
      "desc": "Stage presence, instrument detail, performance energy.",
      "intro": "For turning still shots of musicians, singers, DJs, and live crowds into short performance clips - the kind of energy-driven movement used in music videos, concert recaps, and artist promo content. Paste one of these alongside your photo to bring the performance moment to life.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "guitar-strum-close-up",
          "title": "Guitar Strum Close-Up",
          "text": "Begin on a hand resting flat against the guitar strings, instrument otherwise silent and still. The strumming hand lifts slightly and begins a steady down-up motion across the strings, wrist pivoting loosely while the strings blur faintly with each pass and the other hand's fingers shift subtly along the fretboard. Keep the guitar body and neck perfectly rigid in frame, and do not let the strumming hand grow extra fingers, merge with the strings, or change size between passes.",
          "bestFor": "Acoustic or electric guitar hero shots in artist portraits and live session promos."
        },
        {
          "id": "piano-key-press-sequence",
          "title": "Piano Key Press Sequence",
          "text": "Start with hands hovering just above the keys, completely motionless. Fingers descend individually in a rolling sequence, each key dipping slightly under the fingertip before springing back as the hand shifts position for the next phrase. Keep the depth of each key press shallow and mechanically consistent with a real piano action, and never let fingers pass through the keybed or the keys stay depressed after the finger lifts.",
          "bestFor": "Pianist or keyboardist close-ups in studio sessions and behind-the-scenes recording content."
        },
        {
          "id": "drum-hit-impact-frame",
          "title": "Drum Hit Impact Frame",
          "text": "Open on a drumstick raised just above the drumhead or cymbal, frame frozen. The stick snaps downward in a sharp, controlled arc, striking the surface with a faint ripple of vibration spreading across the drumhead before the stick rebounds upward off the impact. Limit the animation to one clean strike-and-rebound cycle, and don't let the drumhead visibly deform beyond a subtle surface ripple or let the stick clip through the rim.",
          "bestFor": "Drummer action shots and rhythm-focused cutaways in band promo reels."
        },
        {
          "id": "singer-mid-performance-emotional-delivery",
          "title": "Singer Mid-Performance Emotional Delivery",
          "text": "Begin on the singer's face in a neutral, composed pose, mouth closed. The head tilts back slightly as the eyes close and the brow furrows with emotional intensity, the mouth opening into a sustained note before easing back toward a softer expression. Keep the transition gradual across the full clip length, and avoid any teeth or mouth-interior distortion or the neck muscles flexing in an anatomically implausible way.",
          "bestFor": "Emotional ballad or chorus-moment shots in music videos and lyric visualizers."
        },
        {
          "id": "concert-crowd-energy-and-lights",
          "title": "Concert Crowd Energy and Lights",
          "text": "Start on a wide shot of the crowd standing still under dim ambient light. Hands begin rising and waving in loose, staggered waves through the audience as colored stage lights sweep across the crowd's silhouettes, catching raised phones and faces in brief flashes. Keep the crowd's overall density and positions consistent throughout, and don't let individual figures blur into a smeared mass or duplicate into repeating patterns.",
          "bestFor": "Wide concert atmosphere shots used as establishing or cutaway footage in live recap videos."
        },
        {
          "id": "dj-turntable-and-mixer-motion",
          "title": "DJ Turntable and Mixer Motion",
          "text": "Open on a DJ's hand resting near the turntable, deck untouched. The hand nudges the vinyl in a short scratch motion while the other hand adjusts a mixer fader upward in a smooth, deliberate slide, small indicator lights flickering in response on the mixer face. Keep the equipment geometry fixed and unchanging, and don't let the fader or knobs jump to a new position without a visible hand movement causing it.",
          "bestFor": "DJ booth close-ups in club promo clips and electronic music content."
        },
        {
          "id": "microphone-close-vocal-moment",
          "title": "Microphone-Close Vocal Moment",
          "text": "Begin with lips nearly touching the microphone grille, frame tight and still. The head shifts forward almost imperceptibly as the mouth opens to deliver a line, breath visibly fogging the mic grille faintly in cold environments or the pop filter rippling slightly from vocal air pressure. Keep the microphone stand perfectly stationary throughout, and don't let the mic or hand holding it warp, drift in scale, or clip through the singer's face.",
          "bestFor": "Intimate vocal-take close-ups in studio session videos and acoustic performance content."
        },
        {
          "id": "band-synchronized-motion",
          "title": "Band Synchronized Motion",
          "text": "Start on the full band standing in formation, instruments raised but static. On a shared beat, the members lean or step in unison to one side, heads nodding together in rhythm before returning to center as instruments are strummed or struck in sync. Keep each member's spacing and silhouette distinct and non-overlapping throughout the movement, and avoid any two members' limbs passing through each other during the synchronized step.",
          "bestFor": "Full-band group shots in music video group scenes and promotional band photography."
        },
        {
          "id": "spotlight-sweep-onto-performer",
          "title": "Spotlight Sweep Onto Performer",
          "text": "Open on a performer standing in near-darkness, only faintly visible. A single spotlight beam sweeps in from off-frame and lands on the performer, the beam's edge softly brightening the figure while the surrounding background stays dark, dust or haze catching visibly in the light's cone. Keep the beam's edge soft and consistent in width as it travels, and don't let the spotlight snap instantly to full brightness or cause the performer's exposed skin tones to blow out.",
          "bestFor": "Dramatic entrance or reveal shots at the start of a live performance video."
        },
        {
          "id": "turntable-vinyl-spin-detail",
          "title": "Turntable Vinyl Spin Detail",
          "text": "Begin on a vinyl record resting motionless on the platter, needle raised. The platter begins rotating at a steady, consistent speed as the tonearm lowers and the needle settles gently into the groove, tiny reflections sliding across the record's surface as it turns. Keep the rotation speed perfectly constant once started, and don't let the tonearm bounce, drift sideways, or the needle appear to skip across the grooves.",
          "bestFor": "Vinyl and analog-audio aesthetic shots in music-culture and DJ content."
        },
        {
          "id": "backstage-instrument-tuning-moment",
          "title": "Backstage Instrument Tuning Moment",
          "text": "Start on a musician adjusting a tuning peg or dial, instrument held steady. Fingers turn the peg in small, precise increments while the other hand plucks or taps the string or key to check pitch, head tilting slightly to listen. Keep the tuning motion small and incremental rather than a continuous spin, and don't let the instrument's strings or body flex unnaturally under the adjustment.",
          "bestFor": "Behind-the-scenes soundcheck footage and candid pre-show content."
        },
        {
          "id": "crowd-hands-reaching-toward-stage",
          "title": "Crowd Hands Reaching Toward Stage",
          "text": "Open on a sea of raised hands near the stage barrier, still and reaching upward. The hands sway gently side to side and a few extend further upward in bursts as if responding to a musical peak, fingers spreading and closing loosely. Keep the hand count and general crowd layout stable across the clip, and don't let hands merge together, vanish, or reappear in a different spot mid-motion.",
          "bestFor": "Barrier-level crowd interaction shots used to intercut with performer close-ups."
        }
      ],
      "suitableFor": "Acoustic or electric guitar hero shots in artist portraits and live session promos.; Pianist or keyboardist close-ups in studio sessions and…"
    },
    {
      "id": "beauty-cosmetics",
      "num": 22,
      "name": "Beauty & Cosmetics",
      "shortName": "Beauty",
      "group": "vertical",
      "icon": "fa-spa",
      "hue": 320,
      "desc": "Glam shots, product swatches, skin glow.",
      "intro": "For turning still beauty and cosmetics photography into short, polished motion clips - the kind of tactile, close-up movement used in makeup tutorials, skincare ads, and salon promo content. Paste one of these alongside your photo to bring the product or application moment to life.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "makeup-brush-application-sweep",
          "title": "Makeup Brush Application Sweep",
          "text": "Begin with the brush resting just above the skin, bristles loaded with product, face still. The brush lowers and sweeps in soft, overlapping strokes across the cheek or eyelid, bristles flexing slightly against the skin's contour as a faint diffusion of color builds with each pass. Keep the hand and brush at a consistent scale and angle throughout, and don't let the bristles warp, duplicate, or pass through the skin surface instead of resting on it.",
          "bestFor": "Foundation, blush, or eyeshadow application shots in makeup tutorial openers."
        },
        {
          "id": "lipstick-swipe-application",
          "title": "Lipstick Swipe Application",
          "text": "Start on bare, untouched lips with the lipstick bullet held just off the mouth. The lipstick glides across the lips in one smooth, continuous stroke, color filling in evenly as the bullet follows the natural curve of the lip line before lifting away. Keep the stroke speed even and unbroken from corner to corner, and don't let the color apply in patches, jump between frames, or the bullet tip change shape mid-swipe.",
          "bestFor": "Lipstick and lip gloss product shots in beauty ads and close-up tutorials."
        },
        {
          "id": "skincare-cream-texture-swirl",
          "title": "Skincare Cream Texture Swirl",
          "text": "Begin with a dollop of cream resting on the fingertip or skin surface, undisturbed. Fingers press gently into the cream and begin circular massaging motions, the product visibly softening, spreading thin, and absorbing into the skin as the circles widen slightly. Keep the cream's melt-in rate gradual and physically consistent with a real emulsion, and don't let the product vanish instantly or the skin surface ripple unnaturally under the fingers.",
          "bestFor": "Moisturizer, night cream, or body lotion application shots in skincare routine content."
        },
        {
          "id": "serum-drop-release",
          "title": "Serum Drop Release",
          "text": "Open on a dropper poised above the skin, a single bead of serum suspended at its tip. The bead releases and falls in a short, controlled drop, landing on the skin and spreading into a small glossy pool before slowly absorbing at the edges. Keep the droplet's fall governed by gravity with a realistic taper as it stretches from the dropper tip, and don't let the drop hover mid-air, bounce, or split into multiple droplets unexpectedly.",
          "bestFor": "Serum, oil, or essence hero shots in premium skincare product ads."
        },
        {
          "id": "hair-curling-wand-motion",
          "title": "Hair Curling Wand Motion",
          "text": "Begin with a section of hair wrapped loosely around the curling wand, otherwise static. The wand rotates slowly, drawing the hair section snugly around the barrel as light steam or heat shimmer rises faintly, then releases the section into a bouncing, defined curl as the wand pulls away. Keep the hair strand count and length consistent before and after the curl forms, and don't let strands clip through the wand barrel or the curl appear fully formed before the wand has rotated through it.",
          "bestFor": "Hairstyling tutorial shots and salon transformation reveals."
        },
        {
          "id": "hair-brushing-motion",
          "title": "Hair Brushing Motion",
          "text": "Start with hair lying flat and slightly tousled, brush resting at the top of a section. The brush glides downward through the hair in one long, smooth stroke, individual strands separating and falling back into place with a slight bounce as the brush reaches the ends. Keep the stroke path straight and gravity-consistent from root to tip, and don't let the brush snag, teleport back to the top without a return motion, or hair strands merge into a solid block.",
          "bestFor": "Haircare product demonstrations and shine-focused hair ad close-ups."
        },
        {
          "id": "nail-polish-application-stroke",
          "title": "Nail Polish Application Stroke",
          "text": "Begin with a bare, unpainted nail and the polish brush loaded and hovering just above it. The brush lays down one smooth, even stroke of color from the cuticle to the tip, the wet polish catching a glossy highlight as it settles flat. Keep each stroke confined to the nail's actual surface area, and don't let the polish bleed over the cuticle line, pool unevenly, or the brush bristles fan out unnaturally.",
          "bestFor": "Manicure product shots and nail salon promotional content."
        },
        {
          "id": "mirror-reflection-reveal",
          "title": "Mirror Reflection Reveal",
          "text": "Start on a mirror reflecting an empty or out-of-focus space, frame still. The reflection sharpens into focus as a face or styled look comes into view within the mirror's frame, a faint reflected light glint sliding briefly across the glass surface. Keep the reflected image geometrically aligned with real mirror physics throughout, and don't let the reflection show a different pose or expression than what would logically be facing the mirror.",
          "bestFor": "Before-and-after reveal shots and salon or spa result transformations."
        },
        {
          "id": "perfume-mist-spray",
          "title": "Perfume Mist Spray",
          "text": "Open on a perfume bottle held upright, nozzle untouched, still air around it. A finger presses the nozzle down once, releasing a fine, cone-shaped mist that disperses outward and drifts slightly before thinning into invisibility. Limit the spray to a single burst rather than a continuous cloud, and don't let the mist look like solid smoke or hang frozen in the air without gradually dissipating.",
          "bestFor": "Fragrance product ads and luxury beauty commercial openers."
        },
        {
          "id": "eyelash-curling-and-mascara-coat",
          "title": "Eyelash Curling and Mascara Coat",
          "text": "Begin with bare lashes and the mascara wand held just off the lash line. The wand sweeps upward through the lashes in a slight zigzag motion, lashes darkening and lifting slightly with each pass as they separate and lengthen. Keep the wand's bristle pattern stable and the motion confined to the natural lash line, and don't let lashes stretch beyond a plausible length or the wand pass through the eyelid itself.",
          "bestFor": "Mascara and lash product close-ups in eye makeup tutorials."
        },
        {
          "id": "facial-mist-or-toner-application",
          "title": "Facial Mist or Toner Application",
          "text": "Start with a clean, dry face and a mist bottle held at a short distance, untouched. A press of the nozzle releases a fine spray that settles across the skin in tiny glistening droplets, the face tilting back slightly to receive it. Keep the droplet size and spread pattern uniform and light, and don't let the mist appear as large splashing drops or leave the skin looking wet beyond a light dew-like finish.",
          "bestFor": "Toner, setting spray, or hydration-mist shots in skincare and makeup-finishing content."
        },
        {
          "id": "makeup-sponge-blending-bounce",
          "title": "Makeup Sponge Blending Bounce",
          "text": "Begin with a damp makeup sponge resting against the cheek, foundation freshly applied but unblended. The sponge presses and bounces in quick, light dabbing taps across the skin, blending the product's edges into an even, seamless finish as it moves. Keep the bounce motion small and rhythmic rather than a dragging wipe, and don't let the sponge change shape, smear the product into streaks, or leave visible harsh lines behind.",
          "bestFor": "Foundation blending close-ups in flawless-finish makeup tutorial content."
        }
      ],
      "suitableFor": "Foundation, blush, or eyeshadow application shots in makeup tutorial openers.; Lipstick and lip gloss product shots in beauty ads and close-up tutorials."
    },
    {
      "id": "weather-sky-phenomena",
      "num": 23,
      "name": "Weather & Sky Phenomena",
      "shortName": "Weather",
      "group": "atmosphere",
      "icon": "fa-cloud-sun",
      "hue": 210,
      "desc": "Storms, aurora, dramatic sky motion.",
      "intro": "For turning still sky and landscape photography into short, dramatic motion clips built around specific weather events - lightning, aurora, rainbows, storms, and shifting light. Paste one of these alongside your photo to bring the sky itself to life without altering the land or horizon beneath it.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "lightning-flash-across-a-dark-sky",
          "title": "Lightning Flash Across a Dark Sky",
          "text": "Begin on a dark, storm-heavy sky with no visible light source, landscape dim and still. A jagged bolt of lightning branches suddenly across the clouds, its light briefly illuminating the cloud undersides and horizon in a cool white flash before fading back to darkness within a fraction of a second. Keep the flash brief and localized to a natural falloff around the bolt, and don't let the flash overexpose the whole frame to solid white or repeat in an unnatural, evenly-timed flicker.",
          "bestFor": "Storm hero shots and dramatic weather-alert style content."
        },
        {
          "id": "aurora-borealis-shifting-colors-and-movement",
          "title": "Aurora Borealis Shifting Colors and Movement",
          "text": "Start on a night sky showing faint, static bands of aurora light near the horizon. The bands begin to ripple and drift slowly sideways, colors deepening and blending gradually from green into subtle hints of violet or pink as the curtains of light undulate like slow-moving fabric. Keep the color transitions gradual and continuous across the full clip, and don't let the hues jump abruptly from one shade to another or the aurora bands snap into a completely different shape without a smooth in-between motion.",
          "bestFor": "Night-sky travel content and aurora destination marketing."
        },
        {
          "id": "rainbow-forming-after-rain",
          "title": "Rainbow Forming After Rain",
          "text": "Begin on a sky still damp-looking with light rain haze but no rainbow visible. A faint arc begins to emerge against the clearing sky, gradually strengthening in color saturation and sharpening in definition as the rain haze thins, until a fully formed rainbow arcs across the frame. Keep the arc's position and curvature geometrically consistent with the light source implied in the scene, and don't let the rainbow appear instantly at full brightness or flicker in and out before settling.",
          "bestFor": "Post-storm clearing shots and uplifting nature or travel content."
        },
        {
          "id": "dramatic-sunset-color-shift",
          "title": "Dramatic Sunset Color Shift",
          "text": "Start on a sky in early sunset tones, warm but not yet at peak color. The horizon deepens through a slow gradient shift from gold into orange, then into deeper pink and violet near the top of the sky, clouds catching rim light that intensifies as the sun's position implies further descent. Keep the color transition spread evenly across the whole sky rather than isolated to one patch, and don't let the gradient shift look like a hard cut between color stages or the sun itself change position abruptly.",
          "bestFor": "Golden-hour to blue-hour transition shots in travel, real estate, and landscape content."
        },
        {
          "id": "storm-clouds-rolling-in",
          "title": "Storm Clouds Rolling In",
          "text": "Begin on a mostly clear or lightly clouded sky, calm and still. Dense, dark storm clouds begin advancing from one edge of the frame, billowing and rolling over themselves as they thicken and darken the sky progressively, casting a spreading shadow across the landscape below. Keep the cloud advance steady and directionally consistent throughout, and don't let the clouds teleport partway across the sky or the shadow on the ground shift independently of the cloud cover above it.",
          "bestFor": "Ominous weather-change shots and time-lapse-style storm approach content."
        },
        {
          "id": "snow-flurry-swirling",
          "title": "Snow Flurry Swirling",
          "text": "Start on a still winter scene with snow already on the ground but no falling snow in the air. Fine flakes begin drifting down and swirling gently on unseen wind currents, some catching brief gusts that carry them sideways before settling toward the ground. Keep the snowfall density light and consistent rather than intensifying into a blizzard, and don't let flakes move upward against gravity or clump into unnaturally large drifting clusters.",
          "bestFor": "Cozy winter atmosphere shots and holiday-season landscape content."
        },
        {
          "id": "heat-haze-shimmer-over-a-hot-landscape",
          "title": "Heat Haze Shimmer Over a Hot Landscape",
          "text": "Begin on a sunbaked landscape or road, air appearing perfectly clear. A subtle shimmering distortion begins rising just above the ground's surface, the air visibly wavering and bending the light passing through it in soft, rippling vertical streaks near the horizon line. Keep the distortion effect confined to a thin band just above the hottest surfaces, and don't let the shimmer blur or warp the landscape's fixed features like buildings or trees beyond that low band.",
          "bestFor": "Desert, highway, and summer-heat establishing shots needing a felt-temperature cue."
        },
        {
          "id": "fog-rolling-across-a-valley",
          "title": "Fog Rolling Across a Valley",
          "text": "Start on a valley or open landscape visible in clear detail, no fog present. A low bank of fog begins creeping in from the tree line or low ground, thickening and drifting forward in slow, uneven waves that gradually obscure the more distant background details while the foreground stays visible. Keep the fog's leading edge soft and irregular rather than a straight line, and don't let the fog appear instantly at full density or clear features reappear through it inconsistently.",
          "bestFor": "Moody morning landscape shots and atmospheric nature or hiking content."
        },
        {
          "id": "cloud-shadows-racing-across-terrain",
          "title": "Cloud Shadows Racing Across Terrain",
          "text": "Begin on a sunlit landscape with clouds visible overhead but no shadow movement yet. Patches of shadow begin sweeping across the terrain in the direction the clouds are drifting, darkening and brightening sections of ground in a slow, rolling pattern as the cloud cover shifts. Keep the shadow shapes matching plausibly to the cloud shapes above them, and don't let the shadows move faster than the visible cloud drift or appear in areas with no corresponding cloud cover.",
          "bestFor": "Wide aerial or elevated landscape shots emphasizing dynamic natural light."
        },
        {
          "id": "distant-lightning-storm-over-the-horizon",
          "title": "Distant Lightning Storm Over the Horizon",
          "text": "Start on a wide horizon-level shot of a storm system visible far in the distance, sky dim but calm in the foreground. Faint internal flashes pulse silently within the distant cloud mass, illuminating it from within in brief, muted glows without any bolt reaching the ground visibly. Keep the flashes soft and internal to the distant clouds only, and don't let the glow brighten the foreground landscape or repeat in a perfectly rhythmic pattern that reads as mechanical.",
          "bestFor": "Wide-shot storm-watching content and moody distant-weather establishing shots."
        },
        {
          "id": "double-rainbow-intensification",
          "title": "Double Rainbow Intensification",
          "text": "Begin on a sky showing a single faint rainbow arc after rain. The primary arc strengthens in color saturation while a fainter secondary arc gradually becomes visible further out, its color order reversed from the primary, both arcs settling into steady visibility against the clearing sky. Keep the secondary arc noticeably fainter than the primary throughout, and don't let both arcs brighten at an identical rate or appear with mismatched curvature relative to each other.",
          "bestFor": "Rare-phenomenon nature content and dramatic post-storm sky reveals."
        },
        {
          "id": "overcast-sky-breaking-into-sun-rays",
          "title": "Overcast Sky Breaking Into Sun Rays",
          "text": "Start on a fully overcast, flat gray sky with the sun's position not visible. A gap begins to open slowly in the cloud layer, and distinct shafts of sunlight break through, fanning outward and sweeping slightly across the landscape as the gap widens further. Keep the light shafts anchored to the actual gap in the clouds as it moves, and don't let the sunbeams appear disconnected from the cloud opening or flicker on and off abruptly.",
          "bestFor": "Hopeful weather-clearing shots and crepuscular-ray landscape moments."
        }
      ],
      "suitableFor": "Storm hero shots and dramatic weather-alert style content.; Night-sky travel content and aurora destination marketing."
    },
    {
      "id": "travel-tourism",
      "num": 24,
      "name": "Travel & Tourism",
      "shortName": "Travel",
      "group": "vertical",
      "icon": "fa-plane-departure",
      "hue": 185,
      "desc": "Destination reveals, postcard moments.",
      "intro": "Use these when you have a travel photo, such as a landmark, vista, packed suitcase, passport, hotel room, or market street, and want to turn it into an inviting travel video for a blog, itinerary post, or booking ad. Paste one of these alongside your image in Grok Imagine, Runway, Kling, Luma, Sora, or Pika.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "landmark-reveal-push-in",
          "title": "Landmark Reveal Push-In",
          "text": "The camera starts on a wide establishing view of the landmark as shown, positioned small within its surroundings, then pushes forward at a slow, steady rate directly toward the structure, growing larger and more detailed in frame until it fills a strong two-thirds of the shot at the end. The push-in never accelerates or jolts partway through. Do not let the landmark's architectural lines bow, ripple, or warp as the camera nears it, and keep any sky or background clouds drifting only faintly so they don't distract from the approach.",
          "bestFor": "Opening shots for destination guides or itinerary reveals where the landmark is the hero."
        },
        {
          "id": "travel-journal-map-page-flip",
          "title": "Travel Journal Map Page Flip",
          "text": "The camera holds on an open journal or map page as shown, lying flat, then the page lifts gently from one corner and turns over in a single smooth arc, settling flat again to reveal a new page or a marked route beneath it. The paper's curl follows a natural physical curve, not a stiff or instant flip. Do not let text or ink lines smear or duplicate as the page bends, and keep the page's edges crisp rather than fraying or dissolving mid-turn.",
          "bestFor": "Trip-planning content, itinerary breakdowns, or route-reveal intros for a blog or video series."
        },
        {
          "id": "luggage-rolling-motion",
          "title": "Luggage Rolling Motion",
          "text": "The suitcase or bag starts stationary as shown, resting upright on its wheels, then tips slightly forward and begins rolling smoothly across the ground from one side of frame toward the other, its wheels turning in sync with its forward speed. The rolling motion stays level and continuous, without bouncing or skidding sideways. Do not let the wheels spin faster than the suitcase's actual ground speed suggests, and keep the handle and body rigid rather than flexing or wobbling as it moves.",
          "bestFor": "Departure-day content, packing tip videos, or airport and station transition scenes."
        },
        {
          "id": "packing-fold-and-fill-motion",
          "title": "Packing Fold and Fill Motion",
          "text": "The open suitcase starts mostly empty as shown, then clothing items and travel gear lift and settle into it one at a time in a natural folding or stacking motion, each item coming to rest before the next appears, until the case looks packed and ready. Each item's fabric folds with soft, believable draping rather than snapping into place. Do not let items clip through the suitcase walls or through each other, and keep colors and patterns on each item stable rather than shifting between frames.",
          "bestFor": "Packing-guide content, travel checklist videos, or product placement for luggage and travel gear."
        },
        {
          "id": "passport-stamp-close-up",
          "title": "Passport Stamp Close-Up",
          "text": "The camera frames a tight close-up on the open passport page as shown, then a stamp descends from just above frame and presses down firmly onto the page, lifting away to reveal fresh stamped ink, with a light puff of residual ink texture settling on the paper. The stamping motion has a single decisive downward press and lift, not a repeated pounding. Do not let the stamp's imprint smear, double-expose, or float above the page after contact, and keep the passport paper flat without curling at the moment of impact.",
          "bestFor": "Milestone or \"just landed\" content, visa and border-crossing storytelling, or trip-count montages."
        },
        {
          "id": "scenic-vista-slow-pan",
          "title": "Scenic Vista Slow Pan",
          "text": "The camera starts framing one edge of the vista as shown, whether mountains, coastline, or valley, then pans slowly and evenly across the horizon in one direction, keeping the horizon line level throughout the movement until it settles on the opposite edge of the scene. The pan speed stays constant with no speeding up near the end. Do not let the horizon tilt or drift vertically during the pan, and keep distant elements like mountains or water free of warping or doubling as they cross the frame.",
          "bestFor": "Establishing shots for scenic destinations, hiking content, or nature-focused travel reels."
        },
        {
          "id": "train-window-travel-view",
          "title": "Train Window Travel View",
          "text": "The camera holds steady on the view through the train window as shown, while the landscape outside streams past at a smooth, consistent speed suggesting real forward travel, with occasional soft motion blur on nearer objects like trees or poles. The window frame and any reflections stay fixed in place while only the outside scenery moves. Do not let the passing scenery jitter, stutter, or repeat in an obvious loop, and keep the glass reflection subtle rather than overpowering the view beyond it.",
          "bestFor": "Journey and transit storytelling, train travel content, or transition scenes between destinations."
        },
        {
          "id": "boat-window-sea-view",
          "title": "Boat Window Sea View",
          "text": "The camera holds on the porthole or cabin window as shown, while gentle waves roll and glint outside in a slow, repeating swell, and the entire frame sways with a soft, subtle rocking motion matching the rhythm of a boat on calm water. The rocking stays minor and steady, never tipping far enough to feel unstable. Do not let the horizon line beyond the window swing wildly or invert, and keep water reflections rippling smoothly rather than flickering or freezing mid-wave.",
          "bestFor": "Cruise, ferry, or yacht travel content where a calm nautical rhythm sets the mood."
        },
        {
          "id": "hotel-room-reveal",
          "title": "Hotel Room Reveal",
          "text": "The camera starts close on a detail near the entrance of the hotel room as shown, such as a door handle or entry table, then glides smoothly forward and widens its view as it moves deeper into the room, revealing the bed, window, and furnishings in sequence until the full room is visible. The glide moves at one unhurried, continuous speed without stopping short. Do not let furniture edges stretch or bend as new areas of the room come into view, and keep window light consistent in color temperature throughout the reveal.",
          "bestFor": "Hotel and short-term rental listings, staycation content, or accommodation review videos."
        },
        {
          "id": "street-market-wandering-ambience",
          "title": "Street Market Wandering Ambience",
          "text": "The camera holds a steady mid-shot on the market scene as shown, while background stall awnings sway faintly, hanging goods sway gently on their hooks, and distant figures shift with small ambient motion, giving the sense of a living, breathing street market. All motion stays in the background and periphery, subtle and looping believably. Do not let foreground objects or any single vendor's face distort or multiply, and keep the ambient crowd motion slow enough that it reads as natural bustle rather than jittery chaos.",
          "bestFor": "Cultural or food-market travel content where atmosphere and local energy matter more than a single subject."
        },
        {
          "id": "boarding-gate-departure-moment",
          "title": "Boarding Gate Departure Moment",
          "text": "The camera frames the departure gate or boarding walkway as shown, held steady, while a soft focus pull shifts from the foreground signage to the walkway beyond, and ambient motion like a rolling suitcase or a distant figure passes gently through the background. The focus shift is slow and singular, not racking back and forth repeatedly. Do not let background figures warp or leave motion trails as they cross frame, and keep gate signage text sharp and legible throughout the pull.",
          "bestFor": "Departure-day intros, trip-countdown content, or airport transition B-roll."
        },
        {
          "id": "sunset-horizon-color-shift",
          "title": "Sunset Horizon Color Shift",
          "text": "The camera holds a fixed wide shot on the horizon as shown, whether over ocean, desert, or skyline, while the sky's color gradually deepens from its current tone into warmer oranges and purples, and the sun's position eases lower toward the horizon line. The color transition unfolds gradually and evenly across the whole sky, not in sudden bands. Do not let the sun's disc flare, duplicate, or blow out the surrounding sky into solid white, and keep any silhouetted foreground elements crisp and stable as the light shifts behind them.",
          "bestFor": "Golden-hour travel content, romantic getaway promotion, or closing shots for a destination reel."
        }
      ],
      "suitableFor": "Opening shots for destination guides or itinerary reveals where the landmark is the hero.; Trip-planning content, itinerary breakdowns, or route-reveal…"
    },
    {
      "id": "corporate-business",
      "num": 25,
      "name": "Corporate & Business",
      "shortName": "Corporate",
      "group": "vertical",
      "icon": "fa-briefcase",
      "hue": 220,
      "desc": "Confident portraits, office context, brand tone.",
      "intro": "Use these when you have a business photo, such as a handshake, office scene, presentation, laptop, or portrait, and want to turn it into a polished corporate video for a website, LinkedIn post, or pitch deck. Paste one of these alongside your image in Grok Imagine, Runway, Kling, Luma, Sora, or Pika.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "handshake-moment-close-up",
          "title": "Handshake Moment Close-Up",
          "text": "The two hands start just short of touching as positioned in the image, then close the final gap and meet in a firm, natural handshake, gripping and giving one or two gentle up-down pumps before settling still. Each hand's finger placement stays anatomically consistent through contact and motion. Do not let hands or fingers warp, merge, or pass through each other at the point of contact, and keep sleeve cuffs and wrists steady rather than stretching as the grip forms.",
          "bestFor": "Partnership announcements, deal-closing visuals, or About Us pages emphasizing trust."
        },
        {
          "id": "office-ambient-background-motion",
          "title": "Office Ambient Background Motion",
          "text": "The camera holds a fixed mid-shot on the office scene as shown, while background elements carry small, believable life: a monitor's screen glow flickers faintly, blinds cast a slow-shifting light pattern, and a distant colleague shifts posture at a desk. All motion stays confined to the background, subtle and slow. Do not let any background figure's face distort or their motion loop in an obvious repeating pattern, and keep foreground subjects and objects completely still and unaffected by the ambient movement.",
          "bestFor": "Team culture pages, hero banners, or backdrop loops behind text overlays."
        },
        {
          "id": "presentation-whiteboard-reveal",
          "title": "Presentation Whiteboard Reveal",
          "text": "The camera starts on a clean or partially marked whiteboard as shown, then a hand enters frame holding a marker and draws out a diagram, arrow, or key phrase in a smooth, continuous stroke, completing the mark before the hand withdraws. The ink appears only as the marker tip physically traces it, never faster than the hand's movement. Do not let marker lines appear ahead of the pen tip or thicken and thin inconsistently, and keep the hand's grip on the marker steady without extra or warped fingers.",
          "bestFor": "Explainer intros, strategy-session recaps, or consulting and coaching service pages."
        },
        {
          "id": "laptop-typing-close-up",
          "title": "Laptop Typing Close-Up",
          "text": "The camera frames a tight close-up on the hands and keyboard as shown, then fingers move in a natural typing rhythm across the keys, individual keys depressing slightly under each fingertip before springing back, while the screen's glow flickers subtly with changing content. The typing cadence stays believable and varied, not a robotic uniform tap. Do not let fingers clip through the keyboard or multiply, and keep the screen content behind the hands soft and unreadable rather than crisp changing text that draws focus.",
          "bestFor": "Remote work content, SaaS product pages, or freelancer and consultant service intros."
        },
        {
          "id": "conference-room-meeting-ambience",
          "title": "Conference Room Meeting Ambience",
          "text": "The camera holds a steady wide shot on the meeting table as shown, while seated figures shift in small natural ways, such as a slight lean forward, a nod, or a hand gesture mid-sentence, and daylight through the windows behind them holds a soft, steady glow. Each person's individual motion stays minor and non-repeating within the loop. Do not let any face blur, morph, or swap expression unnaturally between frames, and keep the table and shared documents on it completely static throughout.",
          "bestFor": "Team meeting B-roll, corporate culture videos, or board and leadership page backgrounds."
        },
        {
          "id": "business-card-exchange",
          "title": "Business Card Exchange",
          "text": "The two hands start holding their cards apart as shown, then extend toward each other and the cards pass from one hand to the other in a brief, clean exchange, with the receiving hand closing gently around the card as the giving hand withdraws. The card itself stays rigid and flat throughout the pass, never bending mid-air. Do not let the card's printed text blur or duplicate during the exchange, and keep both hands' proportions consistent without extra fingers appearing at the handoff point.",
          "bestFor": "Networking event content, sales and client-relationship pages, or introduction-themed intros."
        },
        {
          "id": "video-call-screen-share-moment",
          "title": "Video Call Screen Share Moment",
          "text": "The camera holds on the laptop or monitor screen as shown, displaying a video call grid or shared presentation, while a cursor moves smoothly to a shared slide or document and a subtle screen highlight indicates the active speaker changing. The cursor's movement and any UI change happen at a slow, deliberate pace. Do not let on-screen faces in the call grid distort or the shared document's text scramble into unreadable static, and keep the screen's brightness steady without sudden flashes.",
          "bestFor": "Remote collaboration content, virtual meeting explainers, or software and productivity tool demos."
        },
        {
          "id": "confident-walk-in-entrance",
          "title": "Confident Walk-In Entrance",
          "text": "The subject starts positioned near the edge or background of the frame as shown, then walks forward with a steady, confident gait, growing larger in frame as they approach, coming to a natural stop in a poised stance near the center. Each stride lands naturally with weight shifting believably between legs. Do not let the legs blur into a smeared or multiplied stepping motion, and keep clothing folds moving in a way that matches the pace of the walk rather than flapping independently.",
          "bestFor": "Executive bios, speaker introductions, or personal branding intros for leadership pages."
        },
        {
          "id": "desk-portrait-subtle-life",
          "title": "Desk Portrait Subtle Life",
          "text": "The camera holds a steady close or medium shot on the seated subject at their desk as shown, while they carry small natural micro-movements: a slow blink, a slight shift of the shoulders, a faint breath rise and fall in the chest. All motion stays minimal and grounded, with no gesture large enough to leave the frame. Do not let the eyes drift out of natural alignment or the mouth move as if starting to speak, and keep the background behind them fixed and undistorted.",
          "bestFor": "Corporate headshot animation, team page portraits, or leadership bio sections."
        },
        {
          "id": "document-signing-close-up",
          "title": "Document Signing Close-Up",
          "text": "The camera frames a tight close-up on the contract or document as shown, resting on the table, then a hand enters holding a pen and signs across the designated line in one fluid, continuous stroke, lifting the pen away once the signature completes. The ink trail appears only exactly where the pen tip travels, at a consistent stroke speed. Do not let the signature line duplicate, warp, or continue drawing after the pen lifts, and keep the paper flat and static without lifting or curling during the signing.",
          "bestFor": "Deal-closing content, contract and legal service pages, or milestone announcement videos."
        },
        {
          "id": "skyline-office-window-backdrop",
          "title": "Skyline Office Window Backdrop",
          "text": "The camera holds a fixed shot on the subject or desk positioned in front of the window as shown, while the city skyline beyond the glass carries faint ambient life: distant lights holding steady, a few clouds drifting slowly, and a soft shift in the sky's light level suggesting time passing gently. The background motion stays entirely beyond the glass and never overtakes the foreground focus. Do not let skyline buildings warp or duplicate as clouds pass in front of them, and keep window glare and reflections stable rather than sweeping unnaturally across the glass.",
          "bestFor": "Executive office branding, corporate headquarters showcases, or aspirational leadership imagery."
        },
        {
          "id": "team-high-five-or-celebration-beat",
          "title": "Team High-Five or Celebration Beat",
          "text": "The two subjects start with hands raised near each other as shown, then bring their palms together in a quick, natural high-five, both arms rebounding slightly afterward before settling, with genuine, brief smiles forming on both faces. The contact moment is crisp and singular, not repeated or looped. Do not let palms pass through each other or fingers fuse together at contact, and keep both subjects' facial expressions shifting gradually rather than snapping instantly from neutral to a full smile.",
          "bestFor": "Team milestone celebrations, culture and morale content, or achievement-announcement posts."
        }
      ],
      "suitableFor": "Partnership announcements, deal-closing visuals, or About Us pages emphasizing trust.; Team culture pages, hero banners, or backdrop loops behind text overlays."
    },
    {
      "id": "seasonal-holiday",
      "num": 26,
      "name": "Seasonal & Holiday",
      "shortName": "Seasonal",
      "group": "vertical",
      "icon": "fa-gifts",
      "hue": 5,
      "desc": "Holiday mood, seasonal décor, festive light.",
      "intro": "Use these when you have a seasonal or holiday photo, such as a snow globe, string lights, festive decor, a pumpkin display, fireworks, a birthday cake, a wrapped gift, or a New Year scene, and want to turn it into a festive animated video for a greeting, ad, or social post. Paste one of these alongside your image in Grok Imagine, Runway, Kling, Luma, Sora, or Pika.",
      "promptCount": 12,
      "prompts": [
        {
          "id": "snow-globe-shake-effect",
          "title": "Snow Globe Shake Effect",
          "text": "The snow globe starts still and clear as shown, then tilts gently side to side as if just picked up, stirring the water inside so loose particles lift off the base scene and swirl upward before settling slowly back down as the tilting eases to a stop. The swirl thins out and resettles at a gradual, natural drifting pace matching real water resistance. Do not let the glass dome distort or double-expose the scene inside as it tilts, and keep the falling particles drifting downward rather than snapping into place or vanishing mid-fall.",
          "bestFor": "Holiday greeting cards, keepsake product listings, or nostalgic winter-themed intros."
        },
        {
          "id": "holiday-string-lights-twinkling-on",
          "title": "Holiday String Lights Twinkling On",
          "text": "The string lights start dim or off as shown, draped in their fixed position, then illuminate one by one or in small soft clusters along the string, each bulb brightening gradually rather than snapping instantly to full glow. The brightening spreads at an unhurried, staggered pace across the string. Do not let the twinkling flicker in a rapid, strobing, or epileptic pattern; keep each bulb's rise in brightness gentle and gradual, holding steady once lit rather than pulsing repeatedly.",
          "bestFor": "Holiday storefront ambience, cozy evening decor reveals, or festive countdown intros."
        },
        {
          "id": "festive-ornament-ambient-sway",
          "title": "Festive Ornament Ambient Sway",
          "text": "The camera holds a fixed shot on the decorated tree or garland as shown, while individual ornaments and hanging décor sway with a faint, independent pendulum motion, as if stirred by a light passing breeze or draft. Each ornament's sway follows its own natural rhythm and never moves in unison like a single rigid unit. Do not let ornaments clip through branches or each other as they swing, and keep any reflective baubles' highlights shifting smoothly rather than flickering harshly as they catch the light.",
          "bestFor": "Christmas tree reveals, garland and mantel decor shots, or cozy holiday atmosphere loops."
        },
        {
          "id": "pumpkin-patch-falling-leaves",
          "title": "Pumpkin Patch Falling Leaves",
          "text": "The pumpkin or autumn display sits still and centered as shown, while a few dried leaves drift down from just above frame, tumbling and spinning gently on their way down before settling near the base or blowing softly out of frame. Each leaf follows its own slightly different falling path and rotation speed, as real leaves would. Do not let leaves fall in a perfectly straight, identical, or repeating pattern, and keep the pumpkin itself completely stationary and undistorted as leaves pass in front of or behind it.",
          "bestFor": "Autumn décor promotion, fall harvest content, or Halloween and Thanksgiving seasonal posts."
        },
        {
          "id": "fireworks-burst-reveal",
          "title": "Fireworks Burst Reveal",
          "text": "The night sky starts dark and empty above the scene as shown, then a firework streaks upward from below frame and bursts into a bright bloom of color, its sparks expanding outward before fading and drifting down as embers. The burst brightens gradually rather than flashing all at once. Do not let the burst overexpose the whole frame into solid white; keep the light bloom localized to the firework itself while the surrounding scene retains its visible detail.",
          "bestFor": "New Year's Eve content, national holiday celebrations, or grand-finale closing shots."
        },
        {
          "id": "birthday-candle-flicker-and-blow-out",
          "title": "Birthday Candle Flicker and Blow-Out",
          "text": "The lit candles on the cake start with a small, steady flame as shown, flickering gently in place, then a soft gust arrives as if from a blowing breath, causing the flames to bend, stretch, and extinguish into a trail of thin smoke that curls upward before dissipating. The flame's bend and extinguishing follow one continuous, believable gust rather than an instant cut to smoke. Do not let the flame duplicate, relight, or flicker back on after going out, and keep the smoke trail thinning gradually rather than vanishing abruptly.",
          "bestFor": "Birthday celebration content, cake reveal videos, or personal milestone social posts."
        },
        {
          "id": "gift-wrapping-ribbon-motion",
          "title": "Gift Wrapping Ribbon Motion",
          "text": "The wrapped gift sits still as shown, its ribbon lying flat, then the ribbon's loose ends lift and cross over each other in a smooth tying motion, cinching into a finished bow that settles gently into shape. The ribbon's fabric or paper texture bends with soft, natural draping through the tying motion. Do not let the ribbon clip through itself or the box during the tie, and keep the bow's final loops symmetrical and stable rather than continuing to shift after settling.",
          "bestFor": "Gift-shop product listings, holiday shopping promotions, or present-reveal social content."
        },
        {
          "id": "new-year-countdown-sparkle",
          "title": "New Year Countdown Sparkle",
          "text": "The scene holds steady on the New Year setup as shown, such as a clock, tabletop display, or skyline, while fine sparkle or glitter particles drift gently upward through the frame, catching soft glints of light as they rise and fade near the top of frame. The particles rise at a slow, buoyant float rather than shooting upward quickly. Do not let the sparkle particles clump into flickering clusters or strobe as they catch light, and keep any clock hands or numbers in the scene sharp and legible throughout.",
          "bestFor": "New Year's countdown content, celebration invitations, or year-end recap closing shots."
        },
        {
          "id": "advent-calendar-window-open",
          "title": "Advent Calendar Window Open",
          "text": "The advent calendar starts fully closed as shown, its small numbered doors flat against the front, then one door swings open on a natural hinge to reveal the treat or image tucked behind it, easing to a stop once fully open. The door's swing follows a believable arc matching its hinge point, not a straight slide or instant disappearance. Do not let the door clip through the calendar's front panel or the revealed contents flicker into view early, and keep the surrounding closed doors completely undisturbed by the motion.",
          "bestFor": "Daily countdown content, holiday marketing calendars, or kid-friendly seasonal promotions."
        },
        {
          "id": "frosted-window-wipe-reveal",
          "title": "Frosted Window Wipe Reveal",
          "text": "The camera holds on the frost-covered window as shown, then a hand enters frame and wipes across the glass in one smooth arc, clearing a path through the frost that reveals the winter scene beyond, with faint condensation trailing at the wipe's edge. The clearing follows exactly where the hand passes, at a steady, unhurried speed. Do not let the frost clear ahead of or independent from the hand's actual path, and keep the revealed scene beyond the glass sharp rather than blurry or warped.",
          "bestFor": "Winter storefront promotions, cozy seasonal intros, or holiday shopping announcement videos."
        },
        {
          "id": "holiday-table-steam-rise",
          "title": "Holiday Table Steam Rise",
          "text": "The camera holds a fixed shot on the holiday meal or warm drink as shown, while soft wisps of steam rise gently from the dish or cup, curling and thinning as they drift upward before fading out near the top of frame. The steam's rise stays slow and wispy, never thickening into a solid cloud. Do not let the steam repeat in an obvious looping pattern or freeze mid-curl, and keep the food or drink itself completely still and unaffected by the rising steam.",
          "bestFor": "Holiday feast content, cozy seasonal recipe posts, or restaurant and bakery holiday menus."
        },
        {
          "id": "confetti-drop-celebration",
          "title": "Confetti Drop Celebration",
          "text": "The scene holds steady on the celebration setup as shown, then confetti pieces drift down from above frame, each piece tumbling and rotating at its own slightly different rate as it falls, some drifting sideways before settling below frame or on visible surfaces. No two confetti pieces fall in an identical, mirrored path. Do not let confetti pass through solid objects in the scene or vanish mid-air, and keep colors on each piece consistent rather than shifting hue as they tumble.",
          "bestFor": "Party announcement content, celebration reveals, or achievement and milestone social posts."
        }
      ],
      "suitableFor": "Holiday greeting cards, keepsake product listings, or nostalgic winter-themed intros.; Holiday storefront ambience, cozy evening decor reveals, or festive…"
    },
    {
      "id": "exploded-view-teardown",
      "num": 28,
      "name": "Exploded-View Teardown",
      "shortName": "Teardown",
      "group": "premium",
      "icon": "fa-gears",
      "hue": 42,
      "desc": "Product exploded-view transformations turn a single still image of an object into a multi-phase sequence where it disassembles into its…",
      "intro": "Product exploded-view transformations turn a single still image of an object into a multi-phase sequence where it disassembles into its constituent parts under implied engineering logic, then optionally reassembles. This is a premium effect because the AI has to track object permanence, part count, and spatial hierarchy across the entire sequence - any drift in part count, floating geometry, or reassembly…",
      "promptCount": 5,
      "premium": true,
      "prompts": [
        {
          "id": "slow-radial-bloom-with-reassembly",
          "title": "Slow Radial Bloom, With Reassembly",
          "text": "Phase 1 - Hold: the object in the photo rests on the surface beneath it under a single soft light, its visible material finish catching a clean highlight, fully assembled and still.\n\nPhase 2 - Transformation begins: the outermost shell or housing visible in the photo lifts away first and drifts outward along a straight path, followed a beat later by the first distinct part layer just beneath that shell easing free in a parallel direction; the next two part layers inward then separate from the remaining mass and drift outward at different heights so no two parts share the same depth, finally exposing the innermost core structure visible at the object's center. Motion is unhurried, as if governed by gentle magnetism rather than force, with a slight rotation on each part so its full silhouette reads clearly as it settles into its floating position.\n\nPhase 3 - Peak state: every part visible in the original photo, from the outer shell down to the innermost core, hangs suspended in an organized radial arrangement around the empty center, evenly spaced with a clear sightline to each piece, then holds briefly before reversing and nesting back into the fully assembled object with a soft final settle.\n\nGuardrails: every part visible in the held frame must reappear in the exploded layout, and every part in the exploded layout must return to the held frame during reassembly - nothing invented, nothing dropped, nothing duplicated. Each part travels a straight or gently arcing path with no clipping through a neighboring part, and reassembly returns each piece to its exact original position and orientation rather than an approximate one. Keep the material finish and lighting direction visible in the photo consistent across every floating part so nothing looks pasted in or lit from a different source than the rest of the scene.",
          "bestFor": "premium product marketing and hero e-commerce shots where the reassembly itself is the payoff.",
          "premium": true
        },
        {
          "id": "rapid-mechanical-burst-no-reassembly",
          "title": "Rapid Mechanical Burst, No Reassembly",
          "text": "Phase 1 - Hold: the object in the photo sits on the surface beneath it, its visible surface finish under even studio light, no motion.\n\nPhase 2 - Transformation begins: on a hard beat, the outermost shell or housing visible in the photo snaps off and kicks away first, immediately followed by the next three distinct part layers inward punching outward from the core along a single exploded axis, each part decelerating hard as it reaches its final floating position rather than drifting loosely. The burst reads as one mechanical event broken into fast sequential beats - shell, then major internals, then core - not a simultaneous scatter, so the eye can track the build order in reverse as a teardown.\n\nPhase 3 - Peak state: the parts hang locked in a tight linear formation, the outer shell at one end and the core at the other, internal layers stacked with gaps proportional to their real thickness as seen in the photo, holding as a frozen cutaway with no reassembly in this variant.\n\nGuardrails: every part must stop at a distance that never exceeds the frame's own width - parts flying off-screen or into impossible depth is the most common failure here. Parts must retain the correct relative size to one another shown in the photo and never merge or interpenetrate at the moment of the burst. If the photo shows a screen, display, or any surface that would normally show live content, keep it a neutral dark or diagnostic glow rather than inventing specific on-screen content.",
          "bestFor": "unboxing content and short-form teardown reels where energy matters more than reassembly.",
          "premium": true
        },
        {
          "id": "linear-exploded-line-diagrammatic-no-reassembly",
          "title": "Linear Exploded-Line, Diagrammatic, No Reassembly",
          "text": "Phase 1 - Hold: the object in the photo sits angled on the surface beneath it with a shallow depth-of-field background, its visible material finish catching soft ambient light.\n\nPhase 2 - Transformation begins: the part layer nearest the front of the object in the photo slides forward and away first, then the next part layer inward releases and tips off, exposing the layer beneath it, which slides out next, followed by the innermost core easing backward in sequence along one clean horizontal axis; each part pauses briefly before the next begins moving, creating a readable, deliberate cadence. Motion speed is unhurried and mechanical, like a museum-quality teardown diagram coming to life, with each element rotating slightly to reveal its mounting points.\n\nPhase 3 - Peak state: all parts rest suspended in a single straight exploded line from the frontmost layer to the innermost core, evenly spaced, forming a clean diagrammatic cross-section of the whole object; the sequence holds on this state and ends without reassembling.\n\nGuardrails: any part with a reflective, optical, or directional surface visible in the photo (a lens, a screen, a mirror, a dial face) must stay oriented so that surface faces the camera consistently throughout - flickering orientation breaks the technical-diagram feel. Do not split any part into more internal pieces than it would plausibly contain given what the photo shows, and keep mounting points, screws, or contacts visibly aligned to where they detached from. Avoid any part rotating a full 360 degrees mid-flight, which reads as physically wrong for a slow linear explosion.",
          "bestFor": "specification videos and technical marketing where the product needs to read as an engineering diagram.",
          "premium": true
        },
        {
          "id": "layered-vertical-peel-with-reassembly",
          "title": "Layered Vertical Peel, With Reassembly",
          "text": "Phase 1 - Hold: the object in the photo sits centered on the surface beneath it, its visible texture clear under crisp lighting.\n\nPhase 2 - Transformation begins: the outermost layer visible in the photo peels away first, curling like a lifted lid, then the next part layer inward lifts straight up in one solid block, followed by the layer after that and any flexible or soft component visible in the photo - cabling, hose, fabric, foam, or a hinge - rising in sequence, each layer stacking directly above the one before it with growing vertical gaps. The peel-and-lift motion feels organic yet controlled, each material behaving according to its real flexibility as shown in the photo - rigid layers hold their shape, any soft component drapes or flexes slightly rather than moving like a rigid plate.\n\nPhase 3 - Peak state: the layers hang stacked vertically in the exact order they came off the object, forming a clean vertical exploded tower; after a hold, the layers reverse and lower back down, any soft component draping naturally as it resettles into place.\n\nGuardrails: any flexible or soft component visible in the photo must visibly flex and drape during its float and descent rather than moving as a rigid solid - treating soft material like hard plastic is an immediate tell. Keep any repeating pattern visible in the photo (stitching, tread, grille, ribbing) identical and undistorted throughout, and ensure no surface pattern changes or duplicates between the hold frame and the reassembled frame. No layer passes through another during either the rise or the return.",
          "bestFor": "products with a genuine soft-goods or layered-material component where the material storytelling is the point.",
          "premium": true
        },
        {
          "id": "heavy-weighted-burst-no-reassembly",
          "title": "Heavy Weighted Burst, No Reassembly",
          "text": "Phase 1 - Hold: the object in the photo sits on the surface beneath it, subtle specular highlights along its visible material surface, a faint haze of ambient light in the background.\n\nPhase 2 - Transformation begins: the part layer nearest the outside of the object lifts first with a heavy, deliberate motion, followed by the next part layer inward popping off and rotating slightly as it rises, then the outer shell separating from the innermost core with visible mounting points trailing empty space, each part moving at a slower, weightier speed than smaller parts to sell its mass. The sequence implies real heft - parts do not float like paper, they move like dense material under barely-there gravity, with slight momentum overshoot before settling.\n\nPhase 3 - Peak state: the full teardown holds as a fanned, hybrid layout with the visibly heavier parts positioned to anchor the composition, forming a clear technical cutaway of the object's internal architecture as suggested by the photo, ending on this frozen exploded state without reassembly.\n\nGuardrails: if any parts repeat in a fixed count in the photo (a matched pair, a set of identical fasteners, a row of identical cells), that exact count must be preserved in the exploded layout - never more, never fewer - and each must remain aligned to the empty slot it came from rather than drifting to the wrong position. Avoid weightless, floaty motion on the visibly heaviest parts; their movement speed and deceleration should read as distinctly heavier than smaller accessory parts. Keep fine detail visible in the photo (fasteners, seams, ports) consistent in position across all floating components.",
          "bestFor": "dense, mechanical, or industrial subjects where mass and engineering heft are the selling point.",
          "premium": true
        }
      ],
      "suitableFor": "Product shots, e-commerce heroes, unboxing teardowns, tech/spec videos - any object you can take apart."
    },
    {
      "id": "vehicle-to-robot-transformer",
      "num": 29,
      "name": "Vehicle-to-Robot Transformer",
      "shortName": "Transformer",
      "group": "premium",
      "icon": "fa-robot",
      "hue": 48,
      "desc": "Vehicle-to-robot sequences take a still image of a vehicle and mechanically reconfigure it into a humanoid or mecha form through panel…",
      "intro": "Vehicle-to-robot sequences take a still image of a vehicle and mechanically reconfigure it into a humanoid or mecha form through panel shifts, folds, and joint articulation, often reversing back to the original vehicle. This is a premium effect because it has to preserve a recognizable link between the source vehicle and the resulting robot at every stage - proportions, panel origins, and part counts have to…",
      "promptCount": 5,
      "premium": true,
      "prompts": [
        {
          "id": "fluid-seamless-standing-reveal",
          "title": "Fluid Seamless Standing Reveal",
          "text": "Phase 1 - Hold: the vehicle in the photo sits still under overcast studio light, its body panels smooth and unbroken.\n\nPhase 2 - Transformation begins: the panel nearest the front of the vehicle in the photo splits along its centerline and folds backward to form shoulder plating while the forward structure retracts and rotates downward into a chest plate; every wheel or ground-contact point visible in the photo swivels inward and rises along the emerging legs as the side panels visible in the photo fold flush against the torso, and the panel nearest the back unfurls upward and backward into a helmeted head, every motion overlapping smoothly with the next so the whole reconfiguration reads as one continuous liquid unfolding rather than separate mechanical steps. Panels glide along implied hidden tracks with rounded, seamless transitions, no exposed gaps or jagged edges.\n\nPhase 3 - Peak state: the vehicle finishes standing fully upright as a humanoid mecha, its chest panel still bearing the recognizable shape of the front panel from the photo, limbs formed from the folded side panels and ground-contact structures, settling into a balanced idle stance with a final subtle plate adjustment.\n\nGuardrails: every exterior panel used to build the robot's limbs and torso must visibly originate from a matching panel on the vehicle shown in the photo - a limb with extra plating that has no traceable source panel is a failure. Every ground-contact point visible in the photo must be accounted for in the final leg and foot structure, never vanishing or duplicating. The final humanoid's proportions must stay believably matched to the vehicle's total body surface area as shown in the photo - not bulkier or larger than the source material could plausibly provide.",
          "bestFor": "hero content and entertainment-style transformation reels for whatever vehicle class you're working with.",
          "premium": true
        },
        {
          "id": "reverse-transformation-robot-to-vehicle",
          "title": "Reverse Transformation, Robot to Vehicle",
          "text": "Phase 1 - Hold: a humanoid mecha built from the vehicle in the photo stands in a neutral idle pose on an empty studio floor, weight shifting subtly between both feet.\n\nPhase 2 - Transformation begins: the mecha crouches first, its leg plating rotating outward, then its arm plating folds inward and down as the shoulder plates unfurl forward into what will become the front panel of the vehicle in the photo, while the head tucks downward and backward into the cavity that will become the rear panel; the torso compresses as chest plating rotates down into the forward structure, all movements flowing in the reverse order and rhythm of a standard transformation. The reverse sequence feels like a mirrored replay - same joints, same panel paths, simply run backward - rather than a different folding logic.\n\nPhase 3 - Peak state: the form settles low to the ground as the vehicle from the photo, every wheel or ground-contact point visible in the photo touching down last as the legs finish rotating into position beneath the body, panels clicking into flush alignment, ending on the vehicle sitting still with a faint settle.\n\nGuardrails: each panel must return to the exact location on the vehicle it originated from during the initial hold - a panel that became a limb must become that same panel again, not a different one. Ground-contact points must not touch down before the leg-to-body geometry has fully rotated into place, which would show the vehicle floating or clipping through its own structure. Keep any cavity-based fold (head into trunk, head into hull compartment) consistent with that cavity's real proportions as shown in the photo, so the head never appears compressed beyond what the space could hold.",
          "bestFor": "entertainment and \"reveal\" style content that plays the transformation in reverse.",
          "premium": true
        },
        {
          "id": "mechanical-clunky-gear-driven-reveal",
          "title": "Mechanical Clunky Gear-Driven Reveal",
          "text": "Phase 1 - Hold: the vehicle in the photo stands or sits under harsh directional light, surfaces contrasting sharply, a faint implied vibration suggesting stored mechanical energy.\n\nPhase 2 - Transformation begins: visible gear teeth or linkages along the body's spine engage first with an audible-feeling mechanical clunk, racking the panel nearest the front of the vehicle forward and down to become articulated arms while the side panels visible in the photo split along a seam and rotate upward into a chest and helmet unit in distinct, stepped stages rather than one fluid pass; every wheel or ground-contact point visible in the photo detaches and rotates to form a torso base or hip structure, each stage pausing briefly before the next gear-driven movement fires. Every transition reads as distinctly mechanical and stepped, with visible linkages, pistons, or gear racks doing the work - this variant has weight and friction to it, never smoothing into a fluid pass.\n\nPhase 3 - Peak state: the vehicle finishes as a biped mecha whose proportions and bulk match how much body panel material is visible in the photo - a smaller or lighter vehicle should resolve into a leaner, more skeletal robot than a larger one - standing with a final gear-lock click as it stabilizes.\n\nGuardrails: the resulting robot's bulk must stay proportional to how much material the vehicle in the photo actually has - do not let it gain implied plating or mass from nowhere. Every ground-contact point visible in the photo must remain identifiable somewhere in the final form, never disappearing into the design unexplained. Keep the stepped, clunky motion honest throughout - no phase should suddenly become smooth and seamless, since mixing transformation styles mid-sequence breaks internal consistency.",
          "bestFor": "action-oriented and gaming-adjacent content where mechanical weight is the appeal.",
          "premium": true
        },
        {
          "id": "crouched-to-standing-reveal",
          "title": "Crouched-to-Standing Reveal",
          "text": "Phase 1 - Hold: the vehicle in the photo rests in dim, moody lighting with a hard-edged shadow beneath it.\n\nPhase 2 - Transformation begins: the vehicle's frame buckles inward at a central hinge first, compressing into a crouched, low mass as the side panels visible in the photo splay outward like unfurling plates to become bent knee guards; from this crouch, hidden struts telescope downward and lock outward while the panel nearest the front retracts into forearm plating, the whole figure slowly rising from its crouch to full height only in the final beat of the sequence. The crouch-to-standing arc feels like a coiled mechanism releasing - compressed and low first, unfolding upward last - distinct from a transformation that goes straight to standing.\n\nPhase 3 - Peak state: the mecha reaches full upright height with knee guards clearly echoing the shape of the side panels from the photo and a chest plate bearing the original paint or finish and panel seams visible in the photo, settling into a ready stance with a slight joint flex retained rather than locking fully straight.\n\nGuardrails: the crouch phase must show genuine mass compression - the frame and panels visibly compacting downward - rather than simply playing the standing transformation at a lower camera angle. Joints must bend in anatomically plausible directions matching a biped, never hyperextending backward. Panels that become limb plating must retain the original paint scheme and seams visible in the photo so the connection to the source vehicle stays legible even in the tightly folded crouch state.",
          "bestFor": "motorsport, gaming-crossover, and combat-adjacent promotional content.",
          "premium": true
        },
        {
          "id": "heavy-fluid-reveal-for-larger-or-multi-axle-vehicles",
          "title": "Heavy Fluid Reveal, For Larger or Multi-Axle Vehicles",
          "text": "Phase 1 - Hold: the vehicle in the photo is parked or docked in even light, its long flat surfaces catching a soft diffused glow.\n\nPhase 2 - Transformation begins: the roofline or upper hull visible in the photo lifts and splits into panels that sweep back to form broad back armor, while the panel nearest the front folds downward and inward to become a wide chest plate; the body compresses telescopically from front to back like an accordion closing, shortening its overall length as every wheel or ground-contact point visible in the photo draws inward in sets and rotates to form multi-jointed legs, the entire compression happening as one slow, powerful continuous fold. Given the larger scale visible in the photo, the motion reads as distinctly massive and slow, with visible structural give in the body panels as they compress.\n\nPhase 3 - Peak state: the vehicle resolves into an imposing, elongated mecha noticeably taller and heavier-set than a smaller single-axle vehicle's transformation would produce, standing with a wide, stable multi-legged stance for balance given its converted base.\n\nGuardrails: the telescoping compression must shorten the form proportionally and consistently - the final torso length should look like it plausibly came from folding the vehicle's real length as shown in the photo, not an arbitrarily shrunk or stretched result. Every ground-contact point visible in the photo must be accounted for in the multi-jointed lower structure, never collapsing to fewer than the source vehicle had. Any repeating surface pattern visible in the photo (windows, panel seams, vents) must stay in a consistent grid across the torso rather than warping or duplicating as the body compresses.",
          "bestFor": "large-vehicle novelty marketing where scale itself is the spectacle.",
          "premium": true
        }
      ],
      "suitableFor": "Cars, trucks, motorcycles, mechs, and vehicle-to-robot transformation reels."
    },
    {
      "id": "liquid-metal-morph",
      "num": 30,
      "name": "Liquid-Metal Morph",
      "shortName": "Liquid Metal",
      "group": "premium",
      "icon": "fa-droplet",
      "hue": 54,
      "desc": "Liquid-metal sequences depict a subject appearing to melt, ripple, or reform as if made of mercury or liquid chrome, either fully…",
      "intro": "Liquid-metal sequences depict a subject appearing to melt, ripple, or reform as if made of mercury or liquid chrome, either fully dissolving and reconstituting into a new shape or showing metallic surface behavior ripple across a subject that otherwise stays structurally intact. This is a premium effect because convincing liquid metal has to obey believable fluid dynamics - viscosity, surface tension, directional…",
      "promptCount": 5,
      "premium": true,
      "prompts": [
        {
          "id": "full-melt-and-reform-into-the-same-shape",
          "title": "Full Melt-and-Reform Into the Same Shape",
          "text": "Phase 1 - Hold: the subject in the photo holds a still, natural pose or resting position under even studio light, its real texture and material rendered normally.\n\nPhase 2 - Transformation begins: a thin band of mirror-chrome liquid sheen appears at the uppermost point of the subject visible in the photo and begins sliding downward across it, converting its real surface into a smooth reflective liquid as it passes; the outline softens at its edges into gently drooping, gravity-affected folds just behind the advancing line, while the area ahead of the wave remains solid a moment longer, creating a clear conversion front, until the entire subject has become a fluid chrome-toned form that sags and pools slightly before catching itself. The liquid moves with visible surface tension - highlights stretch and ripple across the surface as it flows, and any pooling behaves like a heavy, viscous fluid resisting gravity rather than collapsing instantly.\n\nPhase 3 - Peak state: the liquid mass ripples once more and the same conversion wave reverses, solidifying back into the original subject with texture and detail reappearing in the same order they dissolved, settling into the identical starting pose or position shown in the photo with a final soft ripple before going still.\n\nGuardrails: the conversion wave must move in one consistent direction and speed - avoid patches turning liquid out of sequence, which breaks the front-to-back logic. The subject's outline as shown in the photo must remain clearly readable at all times while in fluid form - the mass should not shrink, widen, or lose its defining proportions. Reflections on the liquid surface must track the scene's implied lighting consistently rather than flashing or freezing independent of the surface's own movement.",
          "bestFor": "premium material showcases where the subject needs to return to exactly what it was.",
          "premium": true
        },
        {
          "id": "surface-ripple-only-no-dissolve",
          "title": "Surface-Ripple-Only, No Dissolve",
          "text": "Phase 1 - Hold: the subject in the photo sits under moody rim lighting, its real surface finish glossy and undisturbed.\n\nPhase 2 - Transformation begins: a ripple of mirror-chrome liquid sheen originates at the point where the subject meets the surface beneath it in the photo and travels upward across the surface in a single continuous wave, temporarily turning the real material into a mercury-like reflective surface that distorts the surrounding environment's reflections as it passes, while the subject's actual underlying geometry visible in the photo never deforms or loses shape - only the surface quality changes and then changes back just behind the leading edge of the wave. The ripple behaves like a wave passing across a taut liquid skin stretched over a solid form beneath it, warping reflections dynamically but never causing the underlying structure to bulge or sag.\n\nPhase 3 - Peak state: the ripple reaches the far edge of the subject and fades out, the surface returning fully to its original finish shown in the photo, with a last subtle shimmer along the trailing edge before it settles back to static appearance.\n\nGuardrails: because this is a surface-only effect, the subject's actual silhouette, structure, and proportions visible in the photo must remain completely rigid and unchanged throughout - any melting, drooping, or shape distortion is out of scope for this variant. The liquid sheen band should stay a consistent width as it travels rather than growing or shrinking unpredictably. Reflections within the liquid band must plausibly mirror the actual surrounding environment rather than showing generic or repeating reflection patterns.",
          "bestFor": "premium-finish or paint-quality marketing where the subject's actual shape is the fixed reference point.",
          "premium": true
        },
        {
          "id": "emerging-from-a-single-point-building-outward",
          "title": "Emerging From a Single Point, Building Outward",
          "text": "Phase 1 - Hold: an empty surface or pedestal holds center-frame where the subject will appear, a single small bead of warm gold liquid resting motionless at its center, softly lit.\n\nPhase 2 - Transformation begins: the bead begins pulling upward and outward, stretching into a form that widens unevenly as it builds, roughly suggesting the base of the subject from the photo forming first, then its central mass thickening, then its secondary features budding outward, the entire form built up as more liquid mass seems to feed into the growing shape. The build-outward motion reads as a continuous extrusion rather than separate parts appearing - the liquid is drawn and shaped by unseen pressure, always maintaining a connected, unbroken mass.\n\nPhase 3 - Peak state: the liquid form completes into the same outline as the subject in the photo, still rendered entirely in warm gold, holding its final position, its surface solidifying from the base upward into the real material and texture shown in the photo, finishing as a fully solid version of the subject standing where the bead once sat.\n\nGuardrails: the growth must proceed in a single unbroken sequence from the origin point outward - avoid features appearing before the connecting mass has visibly grown to reach them, which breaks the extrusion logic. Treat the total volume increase from a small bead to the full-sized subject as a deliberate stylized exception, but keep it smooth and continuous rather than showing sudden unexplained bulk appearing. The final solidified form's proportions must read as a normal, believable version of the subject shown in the photo, not stretched or asymmetric from the extrusion process.",
          "bestFor": "origin-story concept content and brand reveals where the subject appears to be born from the material itself.",
          "premium": true
        },
        {
          "id": "melt-into-a-different-final-shape",
          "title": "Melt Into a Different Final Shape",
          "text": "Phase 1 - Hold: the subject in the photo holds still in an otherwise empty, dark space, a single soft light picking it out.\n\nPhase 2 - Transformation begins: every extremity visible in the photo - fingertips, hair, corners, edges, whatever the subject's outermost points are - begins softening first, turning to gunmetal liquid and drawing inward toward the subject's center of mass, thinning and shortening as their liquefied mass flows inward like tributaries feeding a central pool, with the main body following last, collapsing inward in a converging spiral. The inward flow visibly accelerates as more mass joins the central pool, and the surface shows swirling internal currents as different origin-streams merge together.\n\nPhase 3 - Peak state: all liquefied mass consolidates into a single new form (a sphere, an abstract shape, or another deliberately different silhouette from the original), its surface calm and mirror-smooth, holding this new, intentionally non-original final form as the sequence ends.\n\nGuardrails: the inward convergence must clearly originate from the subject's outermost points visible in the photo and flow toward the core - avoid the whole subject collapsing uniformly all at once, which loses the tributary logic. Because the final shape intentionally differs from the starting silhouette, the transition must still conserve an implied consistent volume - the new form's size should look proportional to the subject's mass as shown in the photo, neither too small nor implausibly large. The final surface's reflections must behave like a true liquid mirror tracking the scene's single light source, not a static painted texture.",
          "bestFor": "high-concept, experimental, and art-directed content where transformation into something new is the point.",
          "premium": true
        },
        {
          "id": "color-tinted-surface-ripple",
          "title": "Color-Tinted Surface Ripple",
          "text": "Phase 1 - Hold: the subject in the photo sits on a reflective dark surface, a warm key light catching its real material detail.\n\nPhase 2 - Transformation begins: a ripple of liquid metal tinted a warm copper-gold sweeps across the subject in the photo starting from its uppermost or leading edge, temporarily converting the real surface into a fluid metallic one that still refracts or reflects light at angles matching the subject's actual underlying geometry shown in the photo, which never deforms - only the material quality shifts and then shifts back as the wave passes. The tinted liquid still behaves with true metallic reflectivity, not simply a colored version of the original material - highlights stay sharp, hot, and directional rather than soft and diffused.\n\nPhase 3 - Peak state: the ripple exits past the far edge of the subject and fades, the subject returning fully to its original appearance shown in the photo, with any interior detail (through glass, through a gap) visible again exactly as it was in the opening hold frame.\n\nGuardrails: the subject's actual geometry visible in the photo must remain perfectly rigid throughout - the ripple changes only surface material properties, and any softening or rounding of real edges during the metallic phase is a failure for this variant. Any detail normally visible through or around the subject (contents behind glass, texture beneath a translucent layer) must not be affected by the exterior ripple and should remain visually consistent before and after. The copper-gold tint must stay uniform across the entire rippling surface rather than shifting color partway through the wave.",
          "bestFor": "fragrance, cosmetics, and premium-material marketing where a colored metallic accent needs to read as a deliberate finish, not a costume change.",
          "premium": true
        }
      ],
      "suitableFor": "Liquid chrome / morph effects on people, products, or props for ads and VFX-style clips."
    },
    {
      "id": "miniature-tiltshift-world",
      "num": 31,
      "name": "Miniature / Tilt-Shift World",
      "shortName": "Miniature",
      "group": "premium",
      "icon": "fa-city",
      "hue": 36,
      "desc": "This category transforms a normal-scale photo into a convincing miniature diorama through the classic tilt-shift depth-of-field trick,…",
      "intro": "This category transforms a normal-scale photo into a convincing miniature diorama through the classic tilt-shift depth-of-field trick, paired with a subtle speed-up of ambient motion. The premium complexity comes from faking two signals at once - optical scale (selective blur) and temporal scale (motion speed) - and keeping them believably synchronized as the shift occurs. The template below works on any photo…",
      "promptCount": 6,
      "premium": true,
      "prompts": [
        {
          "id": "horizontal-band-shrink",
          "title": "Horizontal Band Shrink",
          "text": "Phase 1 - Hold: the scene in the photo holds in full, crisp focus at real-world scale, every ambient motion visible in the photo moving at normal speed.\n\nPhase 2 - Transformation begins: a thin horizontal band across the plane in the photo that best anchors the scale illusion stays sharp while a soft gaussian blur rolls in from the top of the frame downward and from the bottom upward simultaneously, closing in on that band like two curtains. As the blur band narrows, the ambient motion visible within the sharp zone perceptibly quickens to roughly 1.5 times normal speed, while color saturation lifts and micro-contrast increases to mimic a glossy, miniature-model sheen.\n\nPhase 3 - Settled result: the blur band stabilizes at a narrow strip only a few real-world units deep, motion within it now reading in slightly jerky, toy-like bursts, and the whole scene reads as a tabletop diorama photographed from a slightly elevated angle.\n\nGuardrails: keep the sharp band locked to a single consistent horizontal plane throughout - never let it drift onto a vertical surface or the sky, which breaks the diorama read instantly. Do not let any single element near the lens remain isolated at obvious full-size proportions; scale cues must shrink uniformly across the whole band. Avoid oversaturating any visible skin tones into plastic-doll orange.",
          "bestFor": "street-level and city scenes with a clear, flat horizontal composition.",
          "premium": true
        },
        {
          "id": "diagonal-or-radial-blur-receding-terrain",
          "title": "Diagonal or Radial Blur, Receding Terrain",
          "text": "Phase 1 - Hold: the scene in the photo holds steady with full depth of field, its ambient motion moving at real speed as the terrain recedes into the distance.\n\nPhase 2 - Transformation begins: a soft radial or diagonal blur (not a straight horizontal band, since the terrain recedes at an angle) opens from the frame's outer edges inward, tracing the ground plane's actual depth contour so the plane in the photo that anchors the scale illusion stays crisp while everything above and beyond it progressively softens. As the blur radius tightens, the ambient motion visible in the photo accelerates to roughly 1.6 times normal speed, and any shadows or light patterns sweep the terrain noticeably faster.\n\nPhase 3 - Peak state: the sharp zone settles into a narrow ribbon following the ground plane's perspective, saturation pushed toward a slightly glossy, resin-model look, with motion now reading as quick, deliberate toy-motion.\n\nGuardrails: because the terrain recedes at an angle rather than flat, the blur must follow the ground plane's perspective lines visible in the photo, not a flat horizontal band - a straight blur band on sloped or receding terrain is the single most common tell that breaks this illusion. Keep large-scale shape and detail (a ridge line, a building's silhouette) intact at reduced clarity rather than erasing it entirely. Do not speed up ambient motion so much that it strobes or judders frame to frame.",
          "bestFor": "landscapes, angled streets, and any scene where the ground plane recedes rather than sitting flat across the frame.",
          "premium": true
        },
        {
          "id": "vignette-ring-aerial-or-top-down",
          "title": "Vignette Ring, Aerial or Top-Down",
          "text": "Phase 1 - Hold: the scene in the photo, shot from directly above or at a steep aerial angle, holds in full sharpness, its ambient motion moving at real speed.\n\nPhase 2 - Transformation begins: because this is a top-down composition, blur rolls in as a soft ring closing from the frame's outer edge toward a central sharp island around the plane in the photo that anchors the scale illusion, rather than a horizontal band. As the sharp island shrinks, the ambient motion visible in the photo accelerates to roughly 1.7 times normal speed, and the overall color palette gains richer, candy-like saturation typical of scale-model sets.\n\nPhase 3 - Settled result: the scene settles into a tight, soft-edged sharp zone around that anchor plane, ambient motion now moving in brisk, clockwork loops, and the aerial view reads unmistakably as a tabletop playset.\n\nGuardrails: keep the sharp island's edge soft and gradual rather than a hard-edged circle, since a crisp circular cutoff reads as a vignette filter rather than optical depth-of-field. If multiple moving elements are visible in the photo, they should accelerate together proportionally - one element moving faster than another breaks the single coherent toy-scale illusion. Preserve the scene's real geometry (field lines, streets, rooftops) exactly as shown in the photo; warping or bending real boundaries during the saturation push will break the photograph's credibility before it reaches diorama status.",
          "bestFor": "aerial and drone-angle photography where the composition is inherently top-down.",
          "premium": true
        },
        {
          "id": "extreme-diorama-high-intensity",
          "title": "Extreme Diorama, High Intensity",
          "text": "Phase 1 - Hold: the scene in the photo holds in full clarity, all elements at true scale and speed.\n\nPhase 2 - Transformation begins: this is the highest-intensity version of the effect - blur rolls in aggressively from the frame's edges within the first quarter of the transformation, converging fast onto a very thin sharp line at the plane in the photo that anchors the scale illusion. The ambient motion visible in the photo jumps to nearly 2 times normal speed as the blur tightens, and any reflective surfaces shimmer in quick, repetitive ripples to reinforce a high-end miniature-photography look.\n\nPhase 3 - Peak state: the scene settles into an extreme, saturated diorama with only a hairline of sharp focus remaining, ambient motion ticking back and forth like clockwork, and the overall image reading unmistakably as a tabletop model photographed macro-close.\n\nGuardrails: at this extreme intensity, the hairline sharp zone must stay anchored to the same plane throughout rather than sliding onto an adjacent surface - even one frame of misplaced focus at this blur strength reads as a rendering error rather than style. Every moving element visible in the photo must accelerate together at the same proportional rate; independent speeds at this intensity look chaotic rather than mechanical. Keep fine color and detail crisp within the sharp band - extreme blur elsewhere should not bleed saturation loss into the in-focus zone.",
          "bestFor": "bold, unmistakable \"toy world\" statement pieces where subtlety isn't the goal.",
          "premium": true
        },
        {
          "id": "subtle-restrained-intensity",
          "title": "Subtle, Restrained Intensity",
          "text": "Phase 1 - Hold: the scene in the photo holds at natural scale, its ambient motion moving at real speed, mood and composition quiet.\n\nPhase 2 - Transformation begins: a shallow, gentle blur (mild intensity, applied at only about 60% of a full tilt-shift strength) settles in above and below a band that includes the plane in the photo that best anchors the scale illusion. The most prominent ambient motion visible in the photo picks up a light, barely-there speed increase - enough to feel slightly brisk but not cartoonish - while any secondary motion in the frame quickens just perceptibly.\n\nPhase 3 - Settled result: the scene reaches a restrained miniature quality - still clearly a diorama on close inspection, but soft enough that the original mood and any human presence remain the emotional focus rather than being upstaged by a novelty effect.\n\nGuardrails: because this is a low-intensity variant, resist the urge to oversaturate colors the way a full-strength miniature effect would - a quiet composition oversaturated into candy tones will feel tonally wrong. If a person is visible in the photo, their stillness and pose must remain completely believable with no added speed-up to their own body, only to background elements. The blur must stay mild enough that any facial detail on a visible person remains legible throughout.",
          "bestFor": "lifestyle, wellness, and mood-driven content that wants a gentle reframe rather than a novelty gimmick.",
          "premium": true
        },
        {
          "id": "human-centered-band",
          "title": "Human-Centered Band",
          "text": "Phase 1 - Hold: a photo of a person standing or sitting in the scene holds in natural full-body scale and even lighting.\n\nPhase 2 - Transformation begins: blur closes in from top and bottom around a band centered on that person's own body, since a standing or seated human subject requires the sharp zone to be built around their vertical center rather than an arbitrary line elsewhere in the scene. Ambient motion in the background visible in the photo speeds up moderately as the band tightens, while the person's own motion (hair or clothing in a breeze) is allowed only the smallest speed increase to avoid distorting their pose.\n\nPhase 3 - Peak state: the scene settles into a diorama with the person from the photo as its centerpiece figure, background motion moving in brisk toy-steps, their clothing and hair rendered with a light glossy miniature-figure sheen while their face and posture remain fully recognizable.\n\nGuardrails: a standing or seated human figure is the highest-risk element for identity loss - keep facial features, proportions, and pose completely stable and apply the miniature \"look\" only through lighting sheen and surrounding motion speed-up, never through actual body distortion or scale shrinking within the frame. Avoid letting the blur band cut across the person's face; it should frame their body so their expression stays legible as the emotional anchor. Do not speed up the person's own hair or clothing motion beyond a gentle flutter, since fast personal motion combined with a static pose looks like a glitch rather than a stylistic effect.",
          "bestFor": "personal social content and creator reels wanting a \"shrink yourself into a toy world\" moment.",
          "premium": true
        }
      ],
      "suitableFor": "Cityscapes, landscapes, streets, and architecture that should look like a toy diorama."
    },
    {
      "id": "double-exposure-reality-blend",
      "num": 32,
      "name": "Double-Exposure Reality Blend",
      "shortName": "Double Exposure",
      "group": "premium",
      "icon": "fa-clone",
      "hue": 30,
      "desc": "This category merges two separate visual realities into a single surreal composite - a subject filling with a second scene, two images…",
      "intro": "This category merges two separate visual realities into a single surreal composite - a subject filling with a second scene, two images cross-fading into one another, or a texture bleeding in from the edges. The premium complexity comes from choreographing WHERE and HOW the second image enters (silhouette-fill, full-frame cross-fade, edge-bleed, directional sweep, or reverse dissolve) while keeping the first…",
      "promptCount": 5,
      "premium": true,
      "prompts": [
        {
          "id": "silhouette-fill-point-origin-bloom",
          "title": "Silhouette-Fill, Point-Origin Bloom",
          "text": "Phase 1 - Hold: The subject in the photo holds still in its existing framing, lit exactly as it appears in the original image, so the outer silhouette edge is crisp and the subject's expression or form is settled.\n\nPhase 2 - Transformation begins: Within the silhouette's interior only, a complementary secondary scene - drifting stars, a forest canopy, flowing water, or a soft cloudscape, whichever best matches the mood and color of the photo - begins fading in from roughly 0% to full visibility. It enters first at the eyes if a face is visible in the photo, or at the silhouette's central point if not, then spreads outward across the interior from there, its own internal light and color intensifying in sync as it spreads, while the silhouette's outer edge stays perfectly opaque and unchanged throughout so the contour never softens or blurs.\n\nPhase 3 - Settled result: The full silhouette interior now reads as the chosen secondary scene, contained exactly within the outline of the subject in the photo, while the subject's defining feature - its eyes, its face, or its most recognizable contour as shown in the photo - remains crisp and unmistakably recognizable against the original backdrop.\n\nGuardrails: The single biggest failure risk is the fill leaking past the silhouette's edge into the backdrop, which destroys the contained \"world inside the subject\" read - the fill must be strictly masked to the interior at all times, using the exact silhouette boundary visible in the photo. Do not let the secondary scene's brightness overpower the silhouette edge's contrast; the outline must stay legible at the composite's brightest moment. Avoid any element of the secondary scene poking past the exact contour established in the original photo, since that breaks the illusion that the subject is a vessel rather than part of the second scene.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "full-frame-cross-fade-balanced-overlap",
          "title": "Full-Frame Cross-Fade, Balanced Overlap",
          "text": "Phase 1 - Hold: The subject in the photo holds in its existing framing, fully sharp and photographic, against the backdrop already visible in the image.\n\nPhase 2 - Transformation begins: A complementary secondary scene - a night skyline, a storm, a starfield, or a textured natural surface, chosen to contrast well with the photo's own color and composition - begins a true cross-fade across the ENTIRE frame simultaneously (not confined to a silhouette), opacity rising evenly from corners and center alike, so for a middle stretch both the original photo and the secondary scene are visible at roughly equal strength, overlapping like genuine double-exposed film. As the secondary scene climbs past the midpoint, the original subject's opacity recedes at the same rate it entered, keeping total visual density constant so the image never looks washed out or overexposed.\n\nPhase 3 - Peak state: The composite settles at a balanced blend where the subject's defining feature as shown in the photo remains ghost-visible through the secondary scene's details, neither image fully dominant.\n\nGuardrails: Because this is a true full-frame cross-fade rather than a masked fill, the greatest risk is both images fighting for the same visual weight and producing a muddy gray blur - the fix is capping combined opacity so the sum of both layers never exceeds full visual density at any single frame. Keep the subject's defining feature from the photo as the brightest, highest-contrast element throughout the blend so it remains the anchor the viewer's eye returns to. Avoid letting the secondary scene's strongest lines or edges land directly over that defining feature in a way that reads as damage rather than an artistic overlay.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "edge-bleed-contour-wash",
          "title": "Edge-Bleed, Contour Wash",
          "text": "Phase 1 - Hold: The subject in the photo holds against its existing backdrop, lit exactly as shown in the original image, framing fully sharp.\n\nPhase 2 - Transformation begins: Rather than filling the interior or cross-fading the whole frame, a complementary material texture or scene - flowing water, marble veining, forest light, or a similar texture that suits the subject's actual material as seen in the photo - bleeds inward strictly from the subject's outer contour, seeping a short, consistent distance in like a watercolor wash creeping from a wet border. The bleed depth is shallow and even - roughly one-tenth of the subject's width as it appears in the photo - and travels around the entire contour at the same pace, so no single area races ahead of the rest.\n\nPhase 3 - Peak state: The subject settles with a consistent ring of the bled-in texture and color hugging the entire contour visible in the photo, while the interior remains the original clean photographic subject, untouched by the blend.\n\nGuardrails: Edge-bleed's core failure mode is uneven bleed depth - if the second scene creeps three times deeper into one region than another, the effect reads as an accidental erasure rather than a designed border, so bleed depth must be tightly matched around the full contour shown in the photo. Keep the interior completely free of the secondary texture; this mechanic depends on a clean untouched core with only the border transformed. Avoid letting the bled-in texture's brightest, highest-contrast feature land directly across the subject's defining feature, since that reads as a compositing error rather than a deliberate border.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "directional-sweep-end-to-end-fill",
          "title": "Directional Sweep, End-to-End Fill",
          "text": "Phase 1 - Hold: The subject in the photo holds in its existing framing against its existing backdrop, fully in its original state, lit so the form or outline already visible in the photo is clearly defined.\n\nPhase 2 - Transformation begins: A complementary secondary scene - light, water, mist, or a natural texture chosen to suit the subject's own shape and mood as photographed - fades in within (or across) the subject starting at whichever end of the subject reads as the natural beginning point in the photo (the base if the subject stands, one edge if the subject is framed horizontally) and sweeping steadily toward the opposite end, following the subject's own long axis as it appears in the image. The boundary between filled and unfilled regions stays a soft, uneven gradient that follows the subject's own natural contours from the photo rather than a flat line, and any secondary motion (sway, shimmer, movement native to the second scene) is introduced into a given region only after the fill has passed it.\n\nPhase 3 - Settled result: The sweep has fully traveled from its starting point to the far end of the subject, the entire subject now reading as the secondary scene within its exact original form from the photo, while its defining feature remains recognizable throughout.\n\nGuardrails: Keep the transition boundary soft and gently uneven, following the subject's actual contours from the photo, moving at a steady even pace - an uneven or diagonal-when-it-shouldn't-be boundary breaks the directional logic the prompt depends on. Do not let any secondary-scene element exceed the subject's natural extent as shown in the photo or poke past its contour. Keep any motion native to the second scene subtle in already-filled regions so it doesn't distractingly out-animate the still-filling region.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "reverse-dissolve-subject-interleaving-into-background",
          "title": "Reverse Dissolve, Subject Interleaving Into Background",
          "text": "Phase 1 - Hold: The subject in the photo holds in its existing framing, with the background already visible in the same photo, both elements sharp in their own depth planes.\n\nPhase 2 - Transformation begins: Instead of a second image entering the subject, the subject's own edge detail begins dissolving outward into the background already present in the photo, the boundary between subject and background softening and interleaving so the background's geometry starts appearing to pass through where the subject's edge used to be solid. The dissolve begins at the subject's outermost edges and works inward, leaving the subject's defining feature - its face, or its most recognizable shape as shown in the photo - solid the longest.\n\nPhase 3 - Settled result: The composite settles with the subject's outer edge now translucent and interwoven with the background from the photo, while its defining feature remains solid enough that the subject is still clearly present, not fully dissolved away.\n\nGuardrails: The key guardrail is stopping the dissolve before it reaches the subject's defining feature - if allowed to consume the whole subject, the composite loses its subject entirely rather than producing a blend. Keep the background geometry showing through the translucent edges logically aligned with the actual background already visible in the photo, not a mismatched second scene. Avoid a hard, sudden cutoff between the solid core and the dissolving edge; the transition band must be gradual to avoid a visible seam line.",
          "bestFor": "Premium transformation effect",
          "premium": true
        }
      ],
      "suitableFor": "Portrait + scene blends, surreal composites, fashion/editorial double-exposure looks."
    },
    {
      "id": "statue-awakening",
      "num": 33,
      "name": "Statue Awakening & Petrification",
      "shortName": "Statue",
      "group": "premium",
      "icon": "fa-monument",
      "hue": 24,
      "desc": "This category covers two mirrored transformations: a rigid material figure gradually coming to life, and a living subject gradually turning…",
      "intro": "This category covers two mirrored transformations: a rigid material figure gradually coming to life, and a living subject gradually turning to that same kind of rigid material. The premium complexity lies in making a material change (rigid mineral or metal surface versus soft organic tissue) look physically believable as it spreads from a specific origin point, rather than a uniform, all-at-once filter swap.…",
      "promptCount": 5,
      "premium": true,
      "prompts": [
        {
          "id": "awakening-or-petrification-from-the-eyes",
          "title": "Awakening or Petrification From the Eyes",
          "text": "Phase 1 - Hold: The figure in the photo holds motionless in its pose and setting exactly as shown - either fully rendered in stone, bronze, or another rigid material with the eyes blank and lifeless, or fully living and naturally lit with the eyes alive and expressive, matching whichever state the uploaded photo actually shows.\n\nPhase 2 - Transformation begins: The change first appears in the eyes. If the photo shows a rigid material, color and moisture bloom from the pupil outward as the blank surface shifts toward living tissue; if the photo shows a living figure, the reverse happens, color and moisture receding as flatness and stillness take hold. Either way, the eyelids pick up the faintest hint of the new state immediately after, and the change spreads outward across the face in a slow radial wave - cheeks, then lips, then jawline - while the rest of the body remains in its original state throughout this phase.\n\nPhase 3 - Peak state: The face is now fully in the new state while the neck downward remains unchanged, with one small, deliberate signal (a slow blink, or the eyes going still) marking that the change has taken hold at the head and is poised to continue downward.\n\nGuardrails: The eyes are the highest-risk detail - if the change blooms in unevenly (one eye ahead of the other, or patchy) it reads as a rendering glitch rather than a deliberate origin, so both eyes must change in careful sync. Keep the boundary between the changed face and the unchanged neck as a soft gradient, not a hard graphic line, since a sharp cutoff looks like a mask rather than a spreading transformation. Do not let the pose shift or the head turn during this phase; the only movement should be the eyes, with any larger gesture implied as a later stage rather than shown here.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "awakening-or-petrification-from-a-limb",
          "title": "Awakening or Petrification From a Limb",
          "text": "Phase 1 - Hold: The figure in the photo holds in its pose and setting exactly as shown, either fully rigid in stone, bronze, or another material, or fully living and mobile, matching whichever state the photo shows.\n\nPhase 2 - Transformation begins: Change originates at the limb most clearly visible in the photo - a hand, a paw, or a foot. If the photo shows a rigid figure, the surface there shifts from the material's own natural intermediate tone (a warming or coloring before flesh tone appears) toward living tissue, with fingers or joints beginning to flex as the change reaches them. If the photo shows a living figure, the reverse happens: skin desaturates and roughens toward the material's texture before the joints lock in place. This spreads up toward the connecting limb next, while the rest of the body including the face remains entirely in its original state.\n\nPhase 3 - Settled result: The originating limb and the limb above it are now fully in the new state, while the rest of the body remains unchanged, establishing a clear, contained first-stage transformation centered on that one limb.\n\nGuardrails: The color or texture transition must pass through the material's own natural intermediate tones before reaching the opposite state, rather than jumping straight there, or the material logic breaks. Keep movement at the origin small and mechanical at first - a full dramatic gesture this early reads as premature and skips the gradualness the prompt depends on. The spread boundary must remain a soft, uneven transition line, mimicking how the material visible in the photo would actually wear or form unevenly, rather than a clean geometric edge.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "base-upward-wave",
          "title": "Base-Upward Wave",
          "text": "Phase 1 - Hold: The figure in the photo stands or rests in its pose and setting exactly as shown, consistent from base to crown in whichever state - rigid material or living tissue - the photo actually shows.\n\nPhase 2 - Transformation begins: The change starts at the feet or base and rises steadily upward like water filling a vessel. If the photo shows a rigid figure, surface texture and color shift from the material's defining traits toward living tissue as the wave climbs; if the photo shows a living figure, living texture gives way to the rigid material's grain and tone instead. As the wave passes each body region, that region begins to show its new state's native movement (breathing, subtle sway, fabric settling) exactly as the change reaches it, never before.\n\nPhase 3 - Peak state: The transformation has climbed partway up the figure, the lower portion now fully in the new state while the upper portion, including the face, remains in the original state as shown in the photo, the boundary itself visibly holding as it prepares to continue upward.\n\nGuardrails: Keep the rising boundary's edge irregular and organic, following the figure's natural anatomy or drapery as seen in the photo, rather than a flat horizontal cutoff, since a perfectly level line looks like a digital wipe rather than an upward-spreading change. Do not introduce any facial or upper-body movement in this phase since the wave has not reached there yet. Any native texture change (grain smoothing into fabric, or skin roughening into mineral grain) must be visible in the texture itself, not just a color shift, or it reads as a paint job rather than an actual material change.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "origin-at-a-point-of-weakness",
          "title": "Origin at a Point of Weakness",
          "text": "Phase 1 - Hold: The figure in the photo stands in its pose and setting exactly as shown, fully living and mobile, with a small, naturally occurring point of weakness already visible in the photo - a mark, a graze, a seam, or a subtle crease - otherwise unremarkable.\n\nPhase 2 - Transformation begins: The change begins exactly at that point of weakness, spreading outward in an uneven, root-like branching pattern across the surrounding surface rather than a clean radial wave, mimicking how a crack pattern branches unpredictably from a point of structural weakness. As the branches lengthen and thicken, movement or grip on that side weakens unevenly depending on how much of the change has reached each part, while the rest of the body remains fully mobile and unaffected.\n\nPhase 3 - Peak state: The affected area is now roughly half-covered in the branching new-state pattern radiating from its origin point, with the figure's expression showing visible strain or awareness, the rest of the body completely unaffected.\n\nGuardrails: The branching pattern must look organic and vein-like (uneven width, irregular forking, denser near the origin and thinner at the tips) rather than symmetrical or geometric, since a tidy pattern contradicts the spreading-from-a-weak-point premise. Keep affected areas' stiffness proportional to how much visible change has reached each part individually rather than uniform locking. The figure's reaction is essential narrative information and must be present; an unreacting subject undercuts the implied urgency.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "slow-full-figure-threshold",
          "title": "Slow Full-Figure Threshold",
          "text": "Phase 1 - Hold: The figure in the photo holds a deliberate, still pose exactly as shown, fully in its starting state, already composed and steady.\n\nPhase 2 - Transformation begins: Rather than a single limb, the change spreads from a natural central point on the figure as seen in the photo - the chest, the hands, or the torso's center - steadily through the whole body, the surface desaturating and gaining the new state's defining texture as the wave passes each region, with the figure's remaining unchanged regions holding progressively stiller or more animated poses (whichever direction the photo's starting state implies) as the wave approaches. Each region loses its original fine detail exactly as the wave reaches it, never before.\n\nPhase 3 - Peak state: The figure is now in the new state from its origin point through roughly the midpoint of the body, with the remainder holding a final, deliberate pose, caught at the precise threshold between the two states.\n\nGuardrails: Keep the wave's leading edge gently uneven, following the figure's natural anatomy as shown in the photo, rather than a razor-flat line. Any diminishing life sign (breathing, blinking) must fade in step with how much of the relevant area has been reached, not stop abruptly all at once. Do not let the still-unchanged portion appear panicked or chaotic unless the mood already established in the photo supports it.",
          "bestFor": "Premium transformation effect",
          "premium": true
        }
      ],
      "suitableFor": "People, statues, figures turning to stone/bronze or coming back to life."
    },
    {
      "id": "giant-scale-transformation",
      "num": 34,
      "name": "Giant-Scale Transformation",
      "shortName": "Giant Scale",
      "group": "premium",
      "icon": "fa-maximize",
      "hue": 18,
      "desc": "This category covers a subject that gradually changes scale relative to its environment - growing to towering, world-dominating size or…",
      "intro": "This category covers a subject that gradually changes scale relative to its environment - growing to towering, world-dominating size or shrinking to miniature scale - while the surrounding world's perspective, lighting, and depth cues adjust believably to sell the illusion. This is a premium/complex effect because scale changes are one of the hardest transformations for AI video models to render without breaking…",
      "promptCount": 5,
      "premium": true,
      "prompts": [
        {
          "id": "ground-anchored-vertical-growth-or-shrink",
          "title": "Ground-Anchored Vertical Growth or Shrink",
          "text": "Phase 1 - Hold: The subject in the photo stands or rests at normal scale within its environment exactly as shown, surrounded by whatever reference objects (people, furniture, vehicles, ground texture) already appear nearby in the image, the framing wide enough to establish the full environment around it.\n\nPhase 2 - Scale change begins: The subject's body begins expanding or shrinking uniformly from the point where it meets the ground or surface in the photo, which stays fixed in place throughout; the camera tilts, pulls back, or pushes in at a matching rate to keep the whole subject in frame, and the reference objects already visible nearby are shown being passed and dwarfed (for growth) or appearing to loom larger (for shrinking) in real time rather than cutting away, their scale acting as a constant ruler against the changing subject.\n\nPhase 3 - Peak state: The subject has reached its new scale relative to the environment shown in the photo, now either towering over the structures and reference objects nearby or dwarfed beneath them, with small ambient details (drifting dust, displaced air, or oversized surface texture) reinforcing the new scale relationship.\n\nGuardrails: Keep growth or shrinkage strictly uniform from the fixed anchor point at the subject's base - no limb, head, or torso should distort or change at a different rate than the rest of the body, and identity, proportions, and any branding or clothing visible in the photo must remain consistent at every size. The reference objects already present in the photo must change in apparent relative size smoothly and continuously, never jumping or resetting between phases, and shadows and lighting direction must stay consistent with the original scene throughout.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "object-growth-or-shrink-from-center-of-mass",
          "title": "Object Growth or Shrink From Center of Mass",
          "text": "Phase 1 - Hold: The subject in the photo sits at normal product-shot scale on the surface already shown, lit exactly as it appears in the original image, with a nearby object in the photo establishing true scale.\n\nPhase 2 - Scale change begins: The subject begins expanding or shrinking from its center of mass where it rests in the photo, its surface textures and details becoming visibly coarser and more magnified (for growth) or finer and more compressed (for shrinking) as the scale changes; the surface it rests on reacts accordingly - cracking and being swallowed from view under growth, or looming larger and grainier under shrinking - while the camera pulls back or descends in a continuous arc to keep the whole subject in frame.\n\nPhase 3 - Peak state: The subject now exists at its new scale within the environment established in the photo, its exact proportions, color, and any labeling or branding still geometrically accurate and undistorted, small details already near it in the photo (or scaled equivalents of them) confirming the new scale.\n\nGuardrails: The subject's proportions, color, and any logo or label placement visible in the photo must remain geometrically accurate and undistorted at every scale - brand-shape fidelity matters as much as the scale illusion itself. Ensure any transition between settings reads as one continuous environment rather than an abrupt cut. Keep light direction and shadow length physically consistent with the new scale throughout.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "environment-breach",
          "title": "Environment Breach",
          "text": "Phase 1 - Hold: The subject in the photo exists at normal scale within the enclosed setting already shown, framed clearly to establish the space around it.\n\nPhase 2 - Growth begins: The subject begins expanding from the point where it meets the ground in the photo, the enclosing structure already visible in the image (a ceiling, walls, a studio backdrop) shown buckling, cracking, and finally being breached as the subject's growing size exceeds the space's capacity; the camera pulls back and widens continuously to follow the subject as it emerges into a larger exterior establishing shot.\n\nPhase 3 - Peak state: The subject now stands fully within a larger exterior context consistent with the setting shown in the photo, dwarfing the surrounding structures, with objects from the original scene (or scaled equivalents) visible near its base for scale.\n\nGuardrails: The structural breach (cracking, buckling, breaking through) must be shown as a gradual, load-bearing consequence of contact and pressure, not an instantaneous or unmotivated cut to rubble. The transition from the enclosed setting shown in the photo to an exterior must read as one continuous environment breach, not a scene cut. Keep the subject's proportions and identity as shown in the photo fully intact and undistorted through the breach.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "micro-world-descent",
          "title": "Micro-World Descent",
          "text": "Phase 1 - Hold: The subject in the photo stands or rests at normal scale within its environment exactly as shown, framed to establish familiar, human-scale surroundings.\n\nPhase 2 - Shrink begins: The subject shrinks steadily from the point where it meets the ground in the photo, nearby surface textures already visible in the image (grass, carpet fibers, wood grain, dust) appearing to scale up and grow coarser in tandem at a matched rate; the camera lowers gradually to track the subject's new eye-line, and depth of field shifts progressively toward macro-photography characteristics - shallow focus, magnified surface texture - rather than snapping abruptly at the end.\n\nPhase 3 - Peak state: The subject is now miniature-scale within the same environment shown in the photo, its textures now looming nearby like boulders, the framing an intimate macro shot emphasizing the wonder or vulnerability of the new scale.\n\nGuardrails: Any clothing, gear, or attached objects on the subject as shown in the photo must shrink in exact lockstep with it - nothing should remain at its original size and appear to float free of the now-smaller subject. Avoid the environment's textures staying photorealistically fine-grained at a scale where they should now read as coarse and oversized. Keep the subject's proportions and identity from the photo intact - no melting or warping - through every stage of the reduction.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "structural-compression-or-extension",
          "title": "Structural Compression or Extension",
          "text": "Phase 1 - Hold: The subject in the photo (a building, structure, or rigid object) is shown at its normal scale within its environment exactly as it appears, framed in a wide establishing angle among comparable neighboring elements already visible in the image.\n\nPhase 2 - Scale change begins: The subject begins compressing or extending from the point where it meets the ground in the photo, its structural details (floors, panels, segments) visibly telescoping into or out of one another in even, mechanical-looking increments while its footprint or base as shown in the photo remains fixed to the ground plane; the camera slowly descends or rises and pushes in as neighboring elements already in the image appear to change in relative scale around it.\n\nPhase 3 - Peak state: The subject now sits at its new scale within the environment shown in the photo, its architectural or structural details compressed or extended proportionally rather than blurred or flattened, framed to emphasize the new size relationship with its surroundings.\n\nGuardrails: Structural details (windows, panels, segments, signage) visible in the photo must compress or extend proportionally rather than becoming a blurry or flattened texture - detail spacing should visibly and sensibly track the scale change. Keep the fixed footprint or base in place throughout so the subject doesn't appear to slide or reposition. Maintain consistent perspective and vanishing points at every size so the environment doesn't appear to warp independently of the subject.",
          "bestFor": "Premium transformation effect",
          "premium": true
        }
      ],
      "suitableFor": "Subjects growing huge or shrinking tiny with the environment reacting believably."
    },
    {
      "id": "artistic-style-transformation",
      "num": 35,
      "name": "Artistic Style Transformation",
      "shortName": "Art Style",
      "group": "premium",
      "icon": "fa-palette",
      "hue": 12,
      "desc": "This category covers a realistic photographic subject gradually transitioning into a distinct painterly, illustrated, or animated art style…",
      "intro": "This category covers a realistic photographic subject gradually transitioning into a distinct painterly, illustrated, or animated art style while keeping the subject's identity, pose, and composition fully recognizable throughout. This is a premium/complex effect because style transfer over time is prone to identity drift, patchy or incomplete stylization, and loss of the original subject's likeness - the…",
      "promptCount": 5,
      "premium": true,
      "prompts": [
        {
          "id": "portrait-or-figure-to-a-named-style-edges-in-spread",
          "title": "Portrait or Figure to a Named Style, Edges-In Spread",
          "text": "Phase 1 - Hold: The figure in the photo is held still, natural photographic lighting and texture fully intact, the pose and expression already shown establishing the exact likeness to be preserved.\n\nPhase 2 - Style shift begins: A painterly, illustrated style - watercolor, bold comic-ink linework, claymation texture, or painterly animation, whichever best suits the mood and coloring already present in the photo - begins emerging first at the edges of the frame and in the background, spreading inward toward the face last. Surface detail gradually simplifies into that style's characteristic treatment (brushstroke blocks, ink outlines, sculpted texture, or pigment washes) while the underlying facial geometry and proportions stay locked to what the photo actually shows.\n\nPhase 3 - Peak state: The figure is now fully rendered in the chosen style, its defining visual traits present throughout, the face and expression from the photo still clearly recognizable as the same subject from Phase 1, framed identically to the original composition.\n\nGuardrails: Identity, proportions, and expression as captured in the photo must remain clearly recognizable throughout - the stylization should change surface rendering, not underlying structure. Ensure the style's defining texture spreads evenly and completes uniformly across the whole frame rather than leaving a patchwork of photographic and stylized regions coexisting in the final state.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "landscape-or-environment-to-a-named-style-contour-first-spread",
          "title": "Landscape or Environment to a Named Style, Contour-First Spread",
          "text": "Phase 1 - Hold: The environment in the photo is held, natural color grading and lighting already present establishing the scene's mood and composition.\n\nPhase 2 - Style shift begins: A painterly, illustrated style - bold comic-ink, watercolor, or a similarly graphic treatment chosen to suit the scene's own colors and shapes - begins tracing or forming along the major silhouettes and contours already visible in the photo first: horizon lines, structural edges, cloud or foliage shapes. It appears to build progressively across the frame, while the chosen style's color and shading treatment (flat fills, brush texture, pigment bleed, cross-hatching) follows just behind, replacing the photographic gradient with the new style's characteristic look.\n\nPhase 3 - Peak state: The full scene now reads in the chosen style, its defining traits present in every major shape and shadow, the composition and camera framing identical to the original photograph.\n\nGuardrails: The stylized contours must trace the actual shapes already present in the photo accurately rather than inventing new silhouettes, keeping the real geography and layout recognizable. Avoid inconsistent treatment across the frame - line weight, brush density, or fill flatness should stay uniform throughout rather than heavy in some areas and thin or incomplete in others.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "product-to-a-named-style-silhouette-locked-build",
          "title": "Product to a Named Style, Silhouette-Locked Build",
          "text": "Phase 1 - Hold: The product in the photo is held on its existing backdrop, lit exactly as shown, its true material, proportions, and any visible branding fully established.\n\nPhase 2 - Style shift begins: A painterly or sculpted style - claymation texture, painterly animation, or flat illustrated color, whichever best suits the product's own material and shape as photographed - begins developing across the product's form, following its actual silhouette and structural seams as shown in the photo rather than inventing new ones, panel by panel or region by region. The once-sharp photographic reflections and shading give way to that style's characteristic surface (flat color fills, sculpted imperfection, painterly texture, or pigment wash); the backdrop and shadow beneath the product shift to match the new style's world simultaneously.\n\nPhase 3 - Peak state: The product now fully reads in the chosen style, its exact silhouette, proportions, and any branding or label from the photo still clearly the same product as the opening frame.\n\nGuardrails: Because this is a product shot, the object's true silhouette, proportions, and branding as shown in the photo must be preserved exactly under the new style - stylized lines or textures should trace real seams and edges, not invent new ones. Ensure the style's surface treatment applies evenly across the whole object without patchy transitional zones where photographic detail lingers alongside the new style.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "full-frame-simultaneous-style-bloom",
          "title": "Full-Frame Simultaneous Style Bloom",
          "text": "Phase 1 - Hold: The subject in the photo is held still, full photographic detail and lighting intact, composition and pose already established clearly.\n\nPhase 2 - Style shift begins: Rather than spreading from one region to another, a painterly or illustrated style - chosen to suit the subject and mood already present in the photo - begins emerging evenly across the entire frame at once, photographic detail giving way to that style's characteristic texture, line work, or color treatment at a matched rate everywhere simultaneously, so no region lags visibly behind another at any point in the transition.\n\nPhase 3 - Peak state: The entire frame now reads in the chosen style uniformly, the subject's defining feature from the photo still clearly recognizable, the composition and framing identical to the original photograph.\n\nGuardrails: The core risk with an all-at-once bloom is uneven pacing that accidentally creates a false directional spread - every region of the frame must progress at the same visible rate. Keep the subject's defining feature from the photo legible at every point in the transition, since a simultaneous bloom gives the viewer no still photographic region to anchor recognition to once the change begins. Avoid the stylization completing in one area noticeably before another, which reads as an error rather than a deliberate design.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "two-stage-style-build-rough-pass-then-refined-detail",
          "title": "Two-Stage Style Build - Rough Pass Then Refined Detail",
          "text": "Phase 1 - Hold: The subject in the photo is held with full photographic clarity, composition and its defining feature clearly established.\n\nPhase 2 - Style shift begins: A painterly or illustrated style - chosen to suit the subject and mood already present in the photo - arrives in two visible stages: first a rough, loose pass across the whole frame (soft shape simplification, a first hint of the target texture, no fine detail yet) settles in evenly, and only once that rough pass is complete does a second, refined pass add the style's finer defining details (crisp outlines, fine brush texture, sculpted micro-detail, or fine pigment grain), building from the rough base rather than appearing from nothing.\n\nPhase 3 - Peak state: The subject now reads as a fully refined rendering in the chosen style, both the rough base and fine detail layer complete, its defining feature from the photo still clearly recognizable throughout.\n\nGuardrails: The rough pass must complete evenly across the whole frame before the refined pass begins in any single region - mixing an unfinished rough pass in one area with an already-refined area in another reads as an inconsistent render rather than a deliberate two-stage build. Keep the subject's proportions from the photo locked through both passes. The refined pass should add detail, not alter the shapes or proportions already established by the rough pass.",
          "bestFor": "Premium transformation effect",
          "premium": true
        }
      ],
      "suitableFor": "Photos shifting into paint, ink, watercolor, clay, or other art styles."
    },
    {
      "id": "bullet-time-freeze-orbit",
      "num": 36,
      "name": "Bullet-Time / Freeze-Orbit Transformation",
      "shortName": "Bullet Time",
      "group": "premium",
      "icon": "fa-bullseye",
      "hue": 6,
      "desc": "This category covers the moment all motion in a scene locks at its most dramatic instant while the camera keeps traveling around the frozen…",
      "intro": "This category covers the moment all motion in a scene locks at its most dramatic instant while the camera keeps traveling around the frozen subject in an arc or full orbit, before motion either resumes or the shot ends held on the frozen frame. It is a premium/complex effect because it asks a video model to do two contradictory things at once - total stillness in the subject and fluid continuous motion in the…",
      "promptCount": 5,
      "premium": true,
      "prompts": [
        {
          "id": "full-orbit-motion-resumes",
          "title": "Full Orbit, Motion Resumes",
          "text": "Phase 1 - Hold: The subject in the photo is captured mid-action in real time, continuing whatever motion the photo has caught it in, natural momentum and motion blur where appropriate, the camera at a static low angle establishing the action's normal speed and energy in the setting visible in the photo.\n\nPhase 2 - Freeze and orbit begins: At the peak of the action frozen in the photo, with the subject at its most extended or dramatic position, all motion halts completely - no jitter, no sway, no drifting particles - while the camera simultaneously begins a full 360-degree orbit around the frozen subject at a smooth, constant angular speed, revealing the frozen moment from every side as it travels. Any loose secondary elements implied by the action in the photo - dust, spray, fabric, debris, or similar material the motion would naturally kick up - hold their exact position and shape throughout.\n\nPhase 3 - Resolution: The camera completes the full orbit and returns to a fresh angle relative to its start, motion then resumes fluidly exactly where it froze, the subject continuing its trajectory naturally as ambient sound and motion return.\n\nGuardrails: Every frozen element - the subject itself and every suspended secondary element - must remain perfectly locked in place for the entire orbit with zero drift; even slight secondary motion during the freeze breaks the illusion immediately. The orbit's radius and height relative to the subject must stay constant throughout, with no wobble, speed change, or sudden radius jump that would read as a camera error rather than a deliberate move. Lighting and reflections on the subject should update believably as the camera angle changes, since a subject lit identically from every angle reads as a flat cutout rather than a real object frozen in space. The subject's face, proportions, and identity as shown in the photo must stay fully consistent from every angle of the orbit.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "partial-arc-ends-on-the-frozen-frame",
          "title": "Partial Arc, Ends on the Frozen Frame",
          "text": "Phase 1 - Hold: The subject in the photo is shown in natural continuous motion leading into the action it is caught doing, the camera tracking gently to establish the scene's normal energy in the setting visible in the photo.\n\nPhase 2 - Freeze and orbit begins: At the peak of the action, everything halts at once, including any suspended particles or loose material the photo's action implies, which hold their exact extended shape against gravity; the camera then begins a partial arc of roughly 150 degrees around the frozen subject, moving at a smooth constant speed, optionally rising or dipping slightly as it travels to reveal the moment from a more dramatic angle by the arc's end.\n\nPhase 3 - Resolution: The camera holds at the new angle reached at the end of the arc, the shot ending on the frozen frame rather than resuming motion, lighting settling into a final key light that emphasizes the moment as a still-frame climax.\n\nGuardrails: Every suspended or extended element must hold its exact frozen shape with no sagging, settling, or continued movement during the arc, since gravity resuming on one element while the rest stays locked is the fastest way to break the illusion. Any ambient motion present in the establishing phase (moving light, background motion, drifting elements) must either freeze along with the subject or be logically absent during the freeze, rather than continuing to move independently. The subject must remain fully recognizable and identity-consistent with the photo at the final held angle.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "slow-deliberate-orbit-premium-luxury-tone",
          "title": "Slow Deliberate Orbit (Premium/Luxury Tone)",
          "text": "Phase 1 - Hold: The subject in the photo is shown static or in restrained motion in the setting the photo places it in, a single controlled light source, the camera static and centered to build anticipation before the peak moment.\n\nPhase 2 - Freeze and orbit begins: The subject reaches the peak of its action, any suspended material implied by the scene catching the light around it; the instant this peak is reached, all motion stops completely and the camera begins a slow, unhurried 360-degree orbit around the frozen subject at a deliberate, constant speed, lighting appearing to subtly re-angle relative to the moving camera to keep the subject looking dimensional from every side.\n\nPhase 3 - Resolution: The camera completes the orbit and returns to its original framing, motion then resumes as the subject continues naturally, any suspended elements falling and settling around it.\n\nGuardrails: Suspended particles or elements must stay perfectly fixed relative to the subject throughout the entire orbit; any element that appears to shift position between the start and end of the orbit breaks the freeze illusion. Reflections and highlights on the subject's surface should update believably as the camera angle changes around it, since a subject that looks lit identically from every angle will read as flat and fake rather than a real frozen object in space. Keep the subject's likeness exactly as shown in the photo throughout the full rotation.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "fast-sweeping-arc-high-energy-tone",
          "title": "Fast Sweeping Arc (High-Energy Tone)",
          "text": "Phase 1 - Hold: The subject in the photo is shown mid-action at speed in its surrounding setting, natural motion blur present, the camera tracking or handheld to establish the action's intensity.\n\nPhase 2 - Freeze and orbit begins: At the peak of the action, all motion halts instantly - any dust, spray, or debris the action would naturally produce holds its exact suspended shape - the camera then sweeps through a 200-degree arc around the frozen subject at a brisk, smooth, constant speed, its height varying slightly as it passes to emphasize the most dramatic part of the frozen subject before settling.\n\nPhase 3 - Resolution: The camera completes its arc and settles at a fresh angle, motion then resumes as the subject continues its trajectory, ambient sound and motion returning at full energy.\n\nGuardrails: Fast-moving suspended elements are the most common failure point for subtly \"continuing\" to move even when everything else is frozen - they must hold their exact frozen volume and shape throughout the orbit without dissipating, thinning, or drifting in a new direction. Keep any reflective or wet surfaces in the environment consistent with a single frozen instant in time as the camera moves, avoiding reflections that appear to update as if time were still passing. The subject's proportions and face must stay true to the photo at every point in the sweep.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "multi-height-orbit-cinematic-reveal",
          "title": "Multi-Height Orbit (Cinematic Reveal)",
          "text": "Phase 1 - Hold: The subject in the photo is shown in natural motion approaching the peak of its action in the setting visible in the photo, the camera at a dynamic angle establishing the scene's energy.\n\nPhase 2 - Freeze and orbit begins: At the exact peak of the action, both the subject and any suspended secondary elements implied by the scene freeze completely; the camera begins a 270-degree orbit that varies in height as it travels, dipping low to reveal one part of the frozen subject before rising to look down on it from above, treating the frozen scene as a three-dimensional volume to move through rather than a flat backdrop.\n\nPhase 3 - Resolution: The camera completes its orbit and settles at a final chosen height and angle, motion then resuming naturally as the subject continues from the frozen instant, or the shot ending held if a still climax is preferred.\n\nGuardrails: Elements at different depths within the frame must maintain correct relative parallax as the camera changes height and position - near elements should shift against far elements exactly as real depth would dictate, otherwise the frozen scene will look like a flat painted layer. Keep the subject's pose, balance, and center of gravity physically plausible as a frozen instant, matching exactly what the photo shows, rather than looking like a floating, unanchored pose.",
          "bestFor": "Premium transformation effect",
          "premium": true
        }
      ],
      "suitableFor": "Action freezes, sports peaks, product hero reveals with a camera orbit around a frozen moment."
    },
    {
      "id": "earth-zoom-pullback",
      "num": 37,
      "name": "Earth Zoom Pullback",
      "shortName": "Earth Zoom",
      "group": "premium",
      "icon": "fa-earth-americas",
      "hue": 72,
      "desc": "This is an escalating pull-back sequence that begins on an extreme close-up and retreats outward through multiple orders of scale,…",
      "intro": "This is an escalating pull-back sequence that begins on an extreme close-up and retreats outward through multiple orders of scale, typically room, building, city, and orbit, in one continuous or staged retreat. It is a premium effect because holding subject coherence, consistent lighting logic, and believable scale relationships across five or six orders of magnitude is far harder for a video model than a single…",
      "promptCount": 5,
      "premium": true,
      "prompts": [
        {
          "id": "continuous-smooth-pull-back",
          "title": "Continuous Smooth Pull-Back",
          "text": "Phase 1 - Hold: Extreme close-up matching exactly what fills the frame in the photo, sharp fine detail visible, the surface texture and immediate surroundings the photo shows holding steady, camera static.\n\nPhase 2 - Transformation begins: The camera begins pulling back smoothly with no cuts, the subject from the photo shrinking to reveal the surroundings the edges of the photo imply, the pull-back speed increasing geometrically so each doubling of distance takes roughly half the time of the last, the environment dissolving outward through intermediate scales (structure, block, city) as one unbroken outward trajectory rather than discrete jumps.\n\nPhase 3 - Peak state: The pull-back continues past city scale into a curved-horizon aerial view and settles on a wide aerial view of whichever setting the photo's own cues suggest - an urban skyline if the photo reads as an indoor or city scene, a natural landscape or coastline if it reads as outdoors and rural - the camera motion easing to a stop as haze or atmosphere fades the ground detail into soft abstraction.\n\nGuardrails: Keep the subject exactly as shown in the photo, perfectly identity-consistent and undistorted through the first two scale transitions, since this is the segment viewers scrutinize most. Do not let any scale transition look like a hard cut - blend through a brief soft-focus frame if needed to hide the jump. Avoid impossible lighting flips relative to what the photo shows (daylight in the close-up, then sudden night in the wide reveal) and do not let the subject's proportions or the environment's layout warp as it shrinks.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "staged-jumps-with-whip-blur-bridges",
          "title": "Staged Jumps with Whip-Blur Bridges",
          "text": "Phase 1 - Hold: Close-up on the subject exactly as it appears in the photo, in sharp focus, the ambient detail visible in the frame present, camera static.\n\nPhase 2 - Transformation begins: The camera retreats in distinct staged jumps rather than one smooth continuum: a first pull-back reveals the immediate room or setting implied by the photo in full, holding briefly, then a faster secondary pull-back reveals the surrounding structure or block that setting would plausibly sit within, holding briefly again, then a final rapid retreat moves through atmosphere into a high-altitude view. Each stage jump uses a brief motion-blur whip to mask the scale discontinuity.\n\nPhase 3 - Peak state: The sequence ends on a high aerial view consistent with the type of place the photo's setting implies, motion blur clearing to crisp stillness as the camera stops.\n\nGuardrails: Since this variation uses deliberate staged jumps rather than continuous pull-back, the motion-blur whip must fully obscure each transition or the cuts will read as an error rather than a stylistic choice - keep each blur long enough to hide the geometry change underneath it. Keep the subject and its immediate surroundings identical in detail (color, shape, layout) to the photo across every reveal so the wider context reads as trustworthy rather than regenerated inconsistently.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "slow-to-fast-acceleration-pivot",
          "title": "Slow-to-Fast Acceleration Pivot",
          "text": "Phase 1 - Hold: Tight close-up matching the photo exactly, the fine detail and immediate surroundings visible in the frame, camera static.\n\nPhase 2 - Transformation begins: The pull-back begins slowly, almost imperceptibly, for the first full second to establish the room or setting the photo places the subject in, then abruptly accelerates into a rapid continuous retreat through the surrounding structure, the block, the city, and into orbit, the sudden acceleration change acting as the dramatic pivot of the sequence rather than a hidden seam.\n\nPhase 3 - Peak state: The retreat ends on a wide aerial context consistent with what the photo's setting implies, the motion braking smoothly over the final half-second to a clean stop.\n\nGuardrails: The deliberate slow-to-fast acceleration pivot must read as intentional pacing rather than a stutter or lag artifact - ensure the speed change follows a smooth curve rather than a sudden linear jump. Keep every reflected, printed, or fine-texture detail visible on the subject in the photo plausible and non-repeating as it shrinks out of visible resolution, avoiding any texture that suddenly \"resets\" to a cleaner state.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "combined-rise-and-retreat",
          "title": "Combined Rise-and-Retreat",
          "text": "Phase 1 - Hold: Close-up at ground or table level matching the framing of the photo, the immediate detail the photo shows present nearby.\n\nPhase 2 - Transformation begins: The camera pulls back and simultaneously rises, a combined dolly-and-crane retreat that reveals the subject from the photo in full, then the room or setting around it, then the surrounding block from a rooftop-height angle, the rise and retreat both accelerating together so the vertical and horizontal scale change feel like one continuous diagonal escape rather than two separate motions.\n\nPhase 3 - Peak state: The shot settles into a high oblique aerial view of the surrounding city or landscape, consistent with the setting the photo implies, the acceleration easing off gradually over the final two seconds rather than stopping sharply.\n\nGuardrails: The combined rise-and-retreat must keep a single consistent horizon line and light-source angle matching the photo throughout, or the geometry will appear to twist unnaturally. Do not allow the original close-up subject to remain suspiciously sharp and identical in scale-relative detail once it should be barely visible from the final height. Watch for the environment's layout regenerating inconsistently between the close and wide views.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "large-scale-gap-jump",
          "title": "Large-Scale-Gap Jump",
          "text": "Phase 1 - Hold: Macro close-up matching the photo, the fine detail it shows visible, camera static.\n\nPhase 2 - Transformation begins: The camera pulls back in two large jumps: first an accelerating retreat that reveals the subject from the photo in its full immediate setting, holding briefly on that full scene; then a second, much faster retreat that skips directly from that scale to a high aerial view, using a soft whip-pan blur to bridge the large scale gap in under a second.\n\nPhase 3 - Peak state: The camera settles on a wide aerial context matching the type of place the photo suggests, holding steady as the blur resolves into sharp focus.\n\nGuardrails: Because this jump crosses an unusually large scale gap in very little time, the whip-blur must be long and complete enough that no intermediate scale is glimpsed inconsistently mid-blur. Keep the subject's color palette and material consistent with the photo once the wider scene is revealed, so the close and wide shots feel like the same photographed reality.",
          "bestFor": "Premium transformation effect",
          "premium": true
        }
      ],
      "suitableFor": "Pulling out from a close subject through scale jumps - location reveals, epic openers."
    },
    {
      "id": "elemental-materialization",
      "num": 38,
      "name": "Elemental Materialization",
      "shortName": "Elemental",
      "group": "premium",
      "icon": "fa-wind",
      "hue": 66,
      "desc": "This category covers a subject forming out of, or dissolving into, a raw physical element - sand, smoke, water, ice or crystal, flower…",
      "intro": "This category covers a subject forming out of, or dissolving into, a raw physical element - sand, smoke, water, ice or crystal, flower petals, or a similar material - with the element behaving according to its own real-world physics rather than a generic particle-dissolve effect. It is a premium effect because each element has distinct physical behavior that must be honored (grains settle and fall, smoke curls…",
      "promptCount": 5,
      "premium": true,
      "prompts": [
        {
          "id": "bottom-up-assembly-forming-sand",
          "title": "Bottom-Up Assembly (Forming, Sand)",
          "text": "Phase 1 - Hold: An empty version of the setting visible in the photo, loose sand present but scattered and formless, grains catching light and shifting slightly in the ambient air, camera holding steady.\n\nPhase 2 - Transformation begins: The sand begins gathering from the ground up into the exact shape of the subject in the photo, accumulating first at the base, then building upward section by section, each layer cohering as though pulled by an implied gathering force. Loose sand continues drifting in from the edges of frame even as the lower sections solidify, so assembly and minor loss happen simultaneously until the uppermost section is the last to lock into shape.\n\nPhase 3 - Peak state: The subject stands fully assembled from sand, textured consistently with how real sand looks and catches light while still matching the proportions, pose, and identity shown in the photo, a final settling motion passing through the form as the last of the material locks into place.\n\nGuardrails: The sand must behave exactly as sand behaves in reality throughout the sequence - grains falling, piling, and settling under gravity - never adopting the physics of a different material. The finished form must resolve into an anatomically or structurally coherent shape that matches the subject in the photo rather than a vague blob, and the build order must stay strictly bottom-up so the sequence reads as physically caused rather than randomly assembled.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "extremities-first-dissolve-disappearing-smoke",
          "title": "Extremities-First Dissolve (Disappearing, Smoke)",
          "text": "Phase 1 - Hold: The subject from the photo standing or resting fully solid and ordinary in the setting the photo shows, camera holding on a steady shot.\n\nPhase 2 - Transformation begins: The conversion into smoke begins at the extremities - the outermost edges of the subject first, matching exactly what the photo shows at its silhouette - spreading inward toward the core as more of the form gives way, each departing section curling and diffusing into visible smoke rather than a clean cut. The remaining solid mass shrinks steadily as the smoke drifts off in a single consistent direction rather than scattering randomly.\n\nPhase 3 - Peak state: The last coherent fragment of the subject converts and disperses into smoke, leaving only a faint haze settled where the subject once stood.\n\nGuardrails: The conversion must progress from a consistent starting point and spread logically rather than have random patches disappear simultaneously across unrelated regions. Keep the departing smoke's direction and speed constant throughout so the dispersal reads as one physical event, and avoid the remaining solid portions looking suspiciously untouched until the very last frame. The parts of the subject still solid must remain identical to the photo until the moment they convert.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "center-out-radial-assembly-water",
          "title": "Center-Out Radial Assembly (Water)",
          "text": "Phase 1 - Hold: An empty version of the setting visible in the photo with scattered droplets and mist nearby, no form yet visible, camera static.\n\nPhase 2 - Transformation begins: Water begins gathering at a single central point - typically where the chest or core of the subject in the photo would sit - and builds outward in expanding layers, reaching the extremities last. Liquid continues arriving from the surrounding space even as the core shape solidifies, beading, flowing, and catching light exactly as real water does the entire time.\n\nPhase 3 - Peak state: The subject stands fully formed from water, matching the pose and proportions shown in the photo, the outermost extremities the last to complete, a final settling pass moving outward from the center as the form stabilizes and light refracts through it.\n\nGuardrails: The outward build must originate strictly from the chosen center point rather than appearing in disconnected patches elsewhere, and the water must maintain its real-world physical behavior - beading, dripping, and reflecting light - at every stage of the expansion. The finished silhouette must stay clearly recognizable as the subject from the photo despite being built from a liquid material.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "full-cycle-assemble-then-hold-then-dissolve-ice-crystal",
          "title": "Full Cycle, Assemble Then Hold Then Dissolve (Ice / Crystal)",
          "text": "Phase 1 - Hold: An empty version of the setting shown in the photo with loose ice fragments or crystalline shards present but formless, camera static.\n\nPhase 2 - Transformation begins: Ice and crystal gather and assemble into the exact shape of the subject in the photo, growing along angular facets the way real crystal forms, building to a fully resolved, recognizable form that holds for a suspended beat.\n\nPhase 3 - Peak state: After holding, the form begins giving way again, cracking and breaking apart back into loose crystalline fragments in the same direction and manner it arrived, until nothing remains but the scattered shards and the empty setting once more.\n\nGuardrails: The assembly and the dissolve should mirror each other's logic (same build direction reversed, same fracture lines maintained) so the full cycle reads as one coherent physical event rather than two unrelated effects stitched together. The ice must never behave like a different material at any point, and the peak held form must be unmistakably the subject from the photo, matching its proportions and identity, before it begins to break apart again.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "slow-ethereal-pacing-vs-fast-dramatic-pacing-flower-petals",
          "title": "Slow Ethereal Pacing vs. Fast Dramatic Pacing (Flower Petals)",
          "text": "Phase 1 - Hold: An empty version of the setting shown in the photo, loose petals present in their natural ambient state, camera holding steady. For a slow, ethereal pacing, use soft, even lighting and minimal ambient movement; for a fast, dramatic pacing, use higher contrast lighting and visible ambient motion in the petals before the transformation starts.\n\nPhase 2 - Transformation begins: Petals convert to or from the exact shape of the subject in the photo, shingling and overlapping like scales as they build outward from the base toward the extremities. In the slow variation, the conversion takes its time, with individual petals clearly trackable as they move. In the fast variation, the same conversion happens in a compressed, energetic burst, with the petals moving quickly but still following their real physical behavior rather than snapping instantly into place.\n\nPhase 3 - Peak state: The subject reaches its fully resolved or fully dispersed state, matching the pose and identity shown in the photo at peak, the pacing established in Phase 2 carrying through to a matching resolution speed - a slow, settling finish for the ethereal version, or a sharper, more sudden finish for the dramatic version.\n\nGuardrails: Regardless of pacing, the petals must never skip their own physics to move faster or slower - a fast version speeds up the same real motion rather than replacing it with an unrelated effect like a flash-cut or wipe. The finished or vanished state must be unmistakably clean either way: a fully recognizable version of the subject from the photo at peak, or a genuinely empty scene at full dissolve, with no half-finished ambiguity lingering past the intended end point.",
          "bestFor": "Premium transformation effect",
          "premium": true
        }
      ],
      "suitableFor": "Subjects forming from or dissolving into sand, smoke, water, ice, petals, etc."
    },
    {
      "id": "costume-identity-morph",
      "num": 39,
      "name": "Costume / Identity Morph",
      "shortName": "Costume Morph",
      "group": "premium",
      "icon": "fa-shirt",
      "hue": 60,
      "desc": "This category covers a subject's clothing, styling, or full look transforming into a distinctly different outfit or persona while the…",
      "intro": "This category covers a subject's clothing, styling, or full look transforming into a distinctly different outfit or persona while the camera holds steady or moves gently, the change propagating across the frame as a wave, ripple, or sweep rather than an instant cut. It is a premium effect because the transformation has to travel convincingly across a three-dimensional body without leaving a visible seam, and the…",
      "promptCount": 5,
      "premium": true,
      "prompts": [
        {
          "id": "vertical-ripple-sweep-target-tailored-formal-suit",
          "title": "Vertical Ripple Sweep (Target: Tailored Formal Suit)",
          "text": "Phase 1 - Hold: The subject in the photo stands in whatever outfit they are wearing in the photo, in the setting visible behind them, holding a relaxed neutral pose, camera locked on a static medium shot.\n\nPhase 2 - Transformation begins: A thin band of shimmering distortion appears at the top of the head and sweeps downward at a slow, even pace, the outfit visible in the photo behind the band instantly resolving into a tailored formal suit while everything below the band remains untouched until the sweep reaches it. The band maintains a consistent horizontal edge as it travels down through chest, waist, and legs, texture and color resolving fully within the width of the band itself rather than fading in gradually.\n\nPhase 3 - Peak state: The band exits past the feet and dissipates, leaving the subject fully restyled in the tailored suit, the same pose and face from the photo held throughout, a faint settle of the new fabric as it responds to gravity for the first time.\n\nGuardrails: The ripple band must stay perfectly horizontal and continuous with no gaps or misaligned seams where it meets the body's contours at shoulders or hips. The subject's face, hair, skin tone, and pose must remain completely unchanged from the photo throughout - only clothing may be affected - and the fabric physics of the new outfit must engage naturally the instant it is revealed rather than looking pasted on.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "horizontal-ground-up-sweep-target-seasonal-costume-look",
          "title": "Horizontal Ground-Up Sweep (Target: Seasonal Costume Look)",
          "text": "Phase 1 - Hold: The subject in the photo stands in whatever outfit is visible in the photo, in that same setting, camera holding a static full-body shot with soft directional light.\n\nPhase 2 - Transformation begins: A glowing horizontal line begins at the ground beneath the subject's feet and rises steadily upward, an elaborate seasonal costume look resolving first at the feet and legs as the line passes, then across the torso as it continues upward, finally reaching the shoulders and neckline last. Any loose fabric or accent pieces in the new outfit visibly animate into place as the line passes, settling with a brief physical sway rather than snapping instantly into a fixed position.\n\nPhase 3 - Peak state: The glowing line passes over the top of the head, completing the transformation into the seasonal costume look, any headwear or hair styling settling into its final position as the glow fades upward and out of frame.\n\nGuardrails: The rising line must maintain even, level progression without stalling or skipping sections of the body, and every newly revealed garment layer must settle with believable fabric weight rather than appearing rigid or flat. Keep the subject's footing, balance, and face unchanged from the photo throughout, and avoid the new outfit's proportions clipping through the body or floating disconnected from the actual silhouette.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "radial-ripple-from-a-center-point-target-futuristic-performance-outfit",
          "title": "Radial Ripple from a Center Point (Target: Futuristic Performance Outfit)",
          "text": "Phase 1 - Hold: The subject in the photo stands centered in frame wearing whatever is visible in the photo, camera holding a static straight-on medium shot.\n\nPhase 2 - Transformation begins: A circular ripple originates at the chest and expands outward in concentric rings, each ring leaving a sleek futuristic performance outfit's detail in its wake as it travels outward past the shoulders, down the arms, and down the torso until the entire garment has been touched by an expanding ring. The rings maintain a consistent expansion speed and a faint raised-relief distortion at their leading edge.\n\nPhase 3 - Peak state: The final ring passes beyond the fingertips and hem, dissipating off the edges of the body, leaving the subject in the futuristic performance outfit, the pose completely unchanged from the opening frame of the photo.\n\nGuardrails: The concentric rings must expand at a mathematically consistent rate so they never appear to overtake or lag behind each other unevenly, and the new outfit's detail must originate strictly from the chest point outward rather than appearing in disconnected patches elsewhere on the body. Preserve the original garment's basic silhouette and cut where relevant so only the surface detail and design change unless a full silhouette change is intended, and keep the subject's face and pose fully stable and matching the photo throughout the bloom.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "rotational-spin-reveal-target-period-accurate-costume",
          "title": "Rotational Spin-Reveal (Target: Period-Accurate Costume)",
          "text": "Phase 1 - Hold: The subject in the photo stands facing the camera in whatever they are wearing in the photo, weight settled evenly, camera holding a steady static medium shot at eye level.\n\nPhase 2 - Transformation begins: The subject begins a slow single rotation in place, and as the body turns away from camera, the outfit from the photo on the now-hidden side resolves into a period-accurate costume, the change occurring specifically during the portion of the turn where that section of the body is edge-on or momentarily obscured from direct view, so that by the time each section rotates back into camera view it has already changed. The rotation completes a full 360 degrees at a constant speed.\n\nPhase 3 - Peak state: The subject completes the rotation facing forward again, now fully in the period-accurate costume, coming to a natural standing stop with a slight settle of the new garment's weight and drape.\n\nGuardrails: The transformation must be timed precisely to the portions of the rotation where the changing body section is least visible, never revealing a mid-change texture glitch on a side facing the camera directly. Keep the rotation speed constant and the subject's balance and footing physically plausible throughout the turn, and ensure hair and accessories update in sync with the clothing rather than lagging behind or changing on a different schedule. The face must match the photo unchanged at every point in the turn.",
          "bestFor": "Premium transformation effect",
          "premium": true
        },
        {
          "id": "shadow-peel-transformation-target-formal-eveningwear",
          "title": "Shadow-Peel Transformation (Target: Formal Eveningwear)",
          "text": "Phase 1 - Hold: The subject in the photo stands in a single dramatic side-lit spotlight wearing whatever outfit the photo shows, a long cast shadow stretching across the floor behind them, camera holding a static low-angle shot.\n\nPhase 2 - Transformation begins: The cast shadow on the floor begins to lift and peel upward off the ground, wrapping around the subject's silhouette like a dark overlay climbing from the feet upward, and everywhere the shadow-overlay passes over the body it leaves behind formal eveningwear in its place, the outfit from the photo visible only in the sections the shadow hasn't yet reached. The shadow-wrap climbs the body in an uneven, organic path rather than a straight line.\n\nPhase 3 - Peak state: The shadow-wrap converges at the top of the head and dissolves into light, revealing the subject fully in the formal eveningwear look under the same dramatic side lighting, the original cast shadow now reduced to a normal, proportionate shadow on the floor.\n\nGuardrails: The shadow-wrap's organic, uneven climb must still resolve every section of the body with no missed patches of the starting outfit once it has passed, and the lighting direction on the newly revealed outfit must match the established side-lit source exactly. Keep the subject's stance and facial identity matching the photo untouched, and ensure the shadow effect reads as a deliberate stylistic device rather than an unexplained dark visual artifact obscuring the subject.",
          "bestFor": "Premium transformation effect",
          "premium": true
        }
      ],
      "suitableFor": "Outfit / look changes on a person - formal, costume, futuristic, period, eveningwear."
    }
  ],
  "layerGuide": {
    "combos": "Pre-merged recipes - start here if you don't want to assemble prompts.",
    "camera": "Categories 01-03: subject-agnostic camera behavior.",
    "human": "Categories 04-05: face and body motion for portraits.",
    "atmosphere": "Categories 06-07, 16, 23: optional style and mood layers.",
    "vertical": "Categories 08-26: motion matched to what's in your photo.",
    "premium": "Categories 28-39: multi-phase photo-native transformation effects (61 templates)."
  }
};
})(typeof window !== 'undefined' ? window : globalThis);
