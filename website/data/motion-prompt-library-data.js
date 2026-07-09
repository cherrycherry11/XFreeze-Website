(function (g) {
  g.XFreezeMotionPromptLibrary = {
  "version": "1.1.0",
  "totalPrompts": 438,
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    },
    {"id": "exploded-view-teardown", "num": 28, "name": "Exploded-View Teardown", "shortName": "Teardown", "group": "premium", "icon": "fa-gears", "hue": 42, "desc": "Products disassemble into tracked parts, then reassemble.", "intro": "Premium transformation prompts where a product separates into its components under engineering logic, then optionally snaps back together.", "promptCount": 9, "premium": true, "prompts": [{"id": "mechanical-wristwatch-radial-slow-separation", "title": "Mechanical Wristwatch - Radial Slow Separation", "text": "Phase 1 - Hold: A mechanical wristwatch rests face-up on a dark reflective surface under a single soft overhead light, the second hand ticking almost imperceptibly, light gliding across the crystal and polished case edge. Phase 2 - Transformation begins: The transparent case back detaches first and drifts straight upward, followed a beat later by the crystal lifting off the dial in a parallel plane; the dial itself then rises, revealing the movement, whose bridges, gear train, mainspring barrel, and balance wheel separate outward from the center in a slow, weighted radial bloom, each part settling into its own orbit at a different height so nothing overlaps. - Motion is unhurried, as if governed by gentle magnetism rather than force, with subtle rotation on each part so its full silhouette reads clearly. Phase 3 - Peak state: All components - case, crystal, dial, hands, movement plates, gear train, mainspring, crown and stem, strap and lugs - hang suspended in a perfectly organized radial constellation around the empty case, evenly spaced with clear sightlines to every part, then hold briefly before reversing and nesting back into the fully assembled watch with a soft final settle. Guardrails: Keep the exact same number of gears, screws, and jewels visible in the exploded layout as would physically exist in the held frame - no duplicating or vanishing tiny components during the float-out. Every part must move along a straight or gently arcing path with no clipping through neighboring parts, and the reassembly must return each piece to its precise original position and orientation, not an approximate one. Maintain consistent scale and lighting direction across all floating parts so none appear pasted-in or unlit.", "bestFor": "Luxury watch brand product marketing and e-commerce hero videos.", "premium": true}, {"id": "smartphone-rapid-mechanical-burst", "title": "Smartphone - Rapid Mechanical Burst", "text": "Phase 1 - Hold: A modern slab smartphone lies flat on a matte studio surface, screen dark with a faint ambient reflection, camera bump catching a sliver of rim light. Phase 2 - Transformation begins: On a hard beat, the rear glass panel snaps off and kicks backward, immediately followed by the battery, mainboard, camera module stack, speaker assembly, and frame punching outward from the chassis in a sharp, energetic burst along a single exploded axis, each part decelerating hard as it reaches its final floating position rather than drifting loosely. - The burst reads as a single mechanical event broken into fast sequential beats - glass, then internals, then frame - not a simultaneous scatter, so the eye can track the build order in reverse as a teardown. Phase 3 - Peak state: The components hang locked in a tight linear exploded-line formation, front glass at one end and rear glass at the other, internal layers stacked with visible gaps proportional to their real thickness, holding as a frozen cutaway before the sequence ends - no reassembly in this variant. Guardrails: Every internal component must stop at a physically plausible distance that never exceeds the frame's own width, avoiding the common failure of parts flying off-screen or into impossible depth. The camera module, battery, and board must retain correct relative size and never merge or interpenetrate at the moment of the burst. Do not allow the screen to display any real interface content - keep it a neutral dark or diagnostic-pattern glow to avoid implying a specific brand's software.", "bestFor": "Tech unboxing content and short-form social teardown reels.", "premium": true}, {"id": "dslr-style-camera-linear-exploded-line-no-reassembly", "title": "DSLR-Style Camera - Linear Exploded-Line, No Reassembly", "text": "Phase 1 - Hold: A mirrorless-style camera body with a detachable lens sits angled on a wooden surface, a shallow depth-of-field background, the lens glass reflecting a soft window light. Phase 2 - Transformation begins: The lens twists a quarter turn and slides forward and away first, then the front plate releases and tips off, exposing the shutter unit, which slides out next, followed by the sensor assembly, mainboard, and viewfinder prism easing backward in sequence along one clean horizontal axis; each part pauses briefly before the next begins moving, creating a readable, deliberate cadence. - Motion speed is unhurried and mechanical, like a museum-quality teardown diagram coming to life, with each element rotating slightly to reveal its mounting points. Phase 3 - Peak state: All parts rest suspended in a single straight exploded line from lens to rear LCD, evenly spaced, forming a clean diagrammatic cross-section of the whole camera; the sequence holds on this state and ends without reassembling. Guardrails: The sensor and prism must remain oriented so their reflective or optical surfaces face the camera consistently - flickering orientation breaks the technical-diagram feel. Do not let the lens elements separate into more internal glass groups than a typical lens would plausibly contain, and keep the mounting screws and contacts visibly aligned to where they detached from. Avoid any part rotating a full 360 degrees mid-flight, which reads as physically wrong for a slow linear explosion.", "bestFor": "Camera gear brand specification videos and technical marketing content.", "premium": true}, {"id": "athletic-sneaker-layered-vertical-peel-with-reassembly", "title": "Athletic Sneaker - Layered Vertical Peel with Reassembly", "text": "Phase 1 - Hold: A running sneaker sits centered on a seamless white background, laces slightly loose, fabric texture visible under crisp studio lighting. Phase 2 - Transformation begins: The outsole peels away first, curling downward and away like a lifted lid, then the midsole foam lifts straight up in one solid block, followed by the internal support cage, insole, and upper (with laces and eyelets intact as one flexible unit) rising in sequence, each layer stacking directly above the one before it with growing vertical gaps. - The peel-and-lift motion should feel organic yet controlled, like layers of a cutaway diagram being lifted by an invisible hand, each material behaving according to its real flexibility - foam holds shape, fabric upper drapes slightly. Phase 3 - Peak state: The four to five layers hang stacked vertically in the exact order they came from the shoe, outsole at the bottom, upper at the top, forming a clean vertical exploded tower; after a hold, the layers reverse and lower back down, the upper draping naturally as it resettles onto the midsole and the outsole folding back into place. Guardrails: The fabric upper must visibly flex and drape during its float and descent rather than moving as a rigid solid, since treating soft goods like hard plastic is an immediate tell. Keep the lace and eyelet pattern identical and undistorted throughout, and ensure the outsole tread pattern does not change or duplicate between the hold frame and the reassembled frame. No layer should pass through another during either the rise or the return.", "bestFor": "Footwear brand product storytelling and material-highlight social content.", "premium": true}, {"id": "v6-engine-block-heavy-mechanical-burst-no-reassembly", "title": "V6 Engine Block - Heavy Mechanical Burst, No Reassembly", "text": "Phase 1 - Hold: A compact V6 engine block sits on a workshop-style turntable stand, subtle specular highlights along the cylinder heads and intake manifold, a faint haze of ambient shop light in the background. Phase 2 - Transformation begins: The intake manifold lifts first with a heavy, deliberate motion, followed by the valve covers popping off and rotating slightly as they rise, then the cylinder heads separating from the block with visible bolt holes trailing empty space, and finally the pistons and connecting rods sliding straight out of their cylinder bores in unison, each moving at a slower, weightier speed than the smaller external parts to sell their mass. - The sequence should imply real torque and heft - parts do not float like paper, they move like cast metal under barely-there gravity, with slight momentum overshoot before settling. Phase 3 - Peak state: The full teardown holds as a radial-and-vertical hybrid layout - heads and manifold fanned above, pistons suspended in a neat parallel row below the block - forming a clear technical cutaway of the engine's internal architecture, ending on this frozen exploded state without reassembly. Guardrails: The number of pistons and connecting rods floating must exactly match a six-cylinder configuration - never more, never fewer - and each piston must remain aligned to its corresponding empty cylinder bore rather than drifting to the wrong slot. Avoid weightless, floaty motion on heavy parts like the block or heads; their movement speed and deceleration should read as distinctly heavier than the manifold or covers. Keep oil, gasket, and bolt details consistent in position across all floating components.", "bestFor": "Automotive and performance parts brand technical marketing.", "premium": true}, {"id": "laptop-fast-radial-burst-with-reassembly", "title": "Laptop - Fast Radial Burst with Reassembly", "text": "Phase 1 - Hold: A slim laptop sits open at a natural typing angle on a clean desk surface, screen showing a soft neutral glow, keyboard backlight barely visible. Phase 2 - Transformation begins: The screen panel detaches and swings back and up first, then the keyboard deck lifts free, followed by the battery, motherboard, cooling fan assembly, and speaker units punching outward from the chassis in a quick radial burst, each part traveling a different short distance so they settle at varied depths rather than a flat plane. - The burst has a snappy, energetic tempo - components accelerate hard and decelerate sharply - while still tracing clean, non-intersecting paths outward from the center of the base chassis. Phase 3 - Peak state: All parts hang in a organized radial sphere-like formation around the empty bottom chassis, screen at the top rear, keyboard deck at the top front, internals fanned in the middle distance; after a brief hold, every part reverses along its exact path and reassembles crisply back into the closed laptop. Guardrails: The keyboard key layout and trackpad must remain identical in the hold frame and the reassembled frame, with no keys shifting position or duplicating. Internal components like the fan and battery must not overlap or clip through the motherboard during transit, and the screen hinge must reconnect at the same pivot point it detached from during reassembly. Avoid any component flashing or changing color temperature independently of the scene's consistent lighting.", "bestFor": "Consumer electronics brand launch trailers and repairability-focused marketing.", "premium": true}, {"id": "espresso-machine-slow-elegant-layered-separation", "title": "Espresso Machine - Slow Elegant Layered Separation", "text": "Phase 1 - Hold: A compact espresso machine sits on a marble countertop, steam wand catching a warm side light, a faint wisp of ambient steam rising from the drip tray. Phase 2 - Transformation begins: The portafilter releases and eases downward and forward first, then the outer shell panels part like unfolding wings to either side, exposing the boiler, pump, and water reservoir, which drift apart at a slow, graceful pace, followed last by the drip tray and grate lowering gently beneath the whole assembly. - Every motion is smooth and unhurried, parts gliding rather than snapping, conveying a premium, considered mechanism rather than a rough teardown. Phase 3 - Peak state: The shell panels, boiler, pump, reservoir, portafilter, and drip tray hang in a wide, airy radial arrangement with generous spacing, resembling a museum display of the machine's inner workings, and the sequence holds on this elegant tableau without reassembling. Guardrails: The two outer shell panels must remain mirror-symmetric in shape and thickness as they part, since any asymmetry reads as a modeling error. Water lines or tubing, if visible, must stretch plausibly like flexible hose rather than snapping rigidly, and should never detach entirely mid-frame. Keep the boiler and reservoir opaque and consistent in material finish throughout, avoiding any moment where interior parts become visible through surfaces that should be solid metal.", "bestFor": "Premium kitchen appliance brand storytelling and countertop lifestyle marketing.", "premium": true}, {"id": "motorcycle-engine-and-frame-rapid-burst-with-reassembly", "title": "Motorcycle Engine and Frame - Rapid Burst with Reassembly", "text": "Phase 1 - Hold: A naked-style motorcycle stands on its kickstand under moody garage lighting, chrome and matte surfaces catching contrasting highlights, engine cooling fins crisply detailed. Phase 2 - Transformation begins: The fuel tank lifts and tilts back first, then the seat and side panels kick outward, followed by the engine cylinder head, crankcase halves, and exhaust system punching away from the frame in a fast, forceful burst, with the wheels and forks separating last along the main vertical axis of the bike. - The burst has real mechanical aggression - quick acceleration on each part with a hard stop - while still preserving a legible front-to-back exploded order that mirrors how the bike would actually be disassembled. Phase 3 - Peak state: The frame hangs centered with the engine components fanned to one side, bodywork fanned to the other, and both wheels suspended fore and aft, forming a wide, dynamic exploded silhouette that clearly still reads as \"motorcycle\"; after a hold, all parts snap back along their paths and reassemble into the complete bike with a final settling bounce. Guardrails: Both wheels must remain identical in diameter, spoke count, and tire tread throughout the sequence, and the front fork must reattach at the same rake angle it started at during reassembly. Avoid the frame itself deforming or bending - it should stay rigid while everything else moves relative to it. Exhaust pipes and cabling must trail in continuous, unbroken lines rather than fragmenting into disconnected floating segments.", "bestFor": "Motorcycle brand launch content and enthusiast social media reels.", "premium": true}, {"id": "wireless-earbuds-case-micro-scale-radial-separation", "title": "Wireless Earbuds Case - Micro-Scale Radial Separation", "text": "Phase 1 - Hold: A pair of wireless earbuds sit nested in their open charging case on a soft fabric surface, a subtle charging LED glowing, both earbuds catching a small specular highlight. Phase 2 - Transformation begins: Each earbud lifts free of its charging cradle simultaneously in a mirrored motion, then each separates further into its outer shell, battery cell, driver unit, and ear tip, all drifting outward in tight, small-scale radial patterns around each earbud's original position, while the case itself splits into lid, hinge, and body drifting apart on a slightly larger radius behind them. - Because the parts are small, motion is deliberately slower and more magnified than a larger product teardown would use, letting each tiny component read clearly against the soft background. Phase 3 - Peak state: Two mirrored micro-exploded clusters hang symmetrically in front of the larger exploded case body, every internal layer of both earbuds and the case visible at once in a balanced, symmetrical composition, holding briefly before the piece ends without reassembly. Guardrails: The two earbuds and their internal components must remain perfectly mirrored in position and part count - any asymmetry between the left and right cluster is an immediate visible error. Ear tips must keep a consistent soft, slightly translucent material look distinct from the hard plastic shell, and must not be duplicated or omitted. Keep the case hinge geometry consistent between the closed hold frame and its separated pivot and hinge pin in the exploded state.", "bestFor": "Audio accessory brand micro-product marketing and short vertical social ads.", "premium": true}]},
    {"id": "vehicle-to-robot-transformer", "num": 29, "name": "Vehicle-to-Robot Transformer", "shortName": "Transformer", "group": "premium", "icon": "fa-robot", "hue": 48, "desc": "Vehicles mechanically reconfigure into humanoid forms.", "intro": "Premium sequences where cars, bikes, and trucks fold into mecha-style robots - and back - with panel-origin tracking at every stage.", "promptCount": 9, "premium": true, "prompts": [{"id": "compact-sedan-fluid-seamless-standing-reveal", "title": "Compact Sedan - Fluid Seamless Standing Reveal", "text": "Phase 1 - Hold: A compact sedan sits parked under overcast studio light, its body panels smooth and unbroken, a faint idle shimmer of heat rising from the hood. Phase 2 - Transformation begins: The hood splits down its centerline and folds backward to form shoulder plating while the front bumper retracts and rotates downward into a chest plate; the front wheels swivel inward and rise along the emerging legs as the doors fold flush against the torso, and the rear hatch unfurls upward and backward into a helmeted head, every motion overlapping smoothly with the next so the whole reconfiguration reads as one continuous liquid unfolding rather than separate mechanical steps. - Panels glide along implied hidden tracks with rounded, seamless transitions, no exposed gaps or jagged edges, keeping the transformation feeling organic despite being entirely mechanical. Phase 3 - Peak state: The sedan finishes standing fully upright as a sleek humanoid mecha roughly seven times its former height in implied scale, its chest panel still bearing the recognizable curve of the original hood, arms formed from the folded front fenders, and it settles into a balanced idle stance with a final subtle shoulder-plate adjustment. Guardrails: Every exterior panel used to build the robot's limbs and torso must visibly originate from a matching panel on the original car - an arm that suddenly has extra plating with no visible source panel is a failure. Keep exactly four wheels accounted for as they integrate into the leg and foot structures, never allowing a wheel to vanish or duplicate. The proportions of the final humanoid must stay believably matched to a single sedan's total body panel surface area, avoiding an oversized or bulkier robot than the source material could plausibly provide.", "bestFor": "Automotive brand hero content and entertainment-style transformation reels.", "premium": true}, {"id": "compact-sedan-reverse-transformation-robot-to-vehicle", "title": "Compact Sedan - Reverse Transformation, Robot to Vehicle", "text": "Phase 1 - Hold: A humanoid mecha stands in a neutral idle pose on an empty studio floor, its chest plate faintly reflecting overhead light, weight shifting subtly between both feet. Phase 2 - Transformation begins: The mecha crouches first, knees bending as the leg plating begins rotating outward, then the arms fold inward and down as the shoulder plates unfurl forward into what will become the hood, while the head tucks downward and backward into the trunk cavity; the torso compresses as chest plating rotates down to become the front bumper, all movements flowing in the reverse order and rhythm of a standard transformation. - The reverse sequence should feel like a mirrored replay - same joints, same panel paths, simply run backward - rather than an entirely different folding logic, preserving mechanical believability. Phase 3 - Peak state: The form settles low to the ground as the compact sedan, wheels touching down last as the legs finish rotating into position beneath the chassis, panels clicking into flush alignment, ending on the car sitting still with a faint suspension settle. Guardrails: Each panel must return to the exact same location on the car it originated from during the initial hold - a hood panel must become the hood again, not a door. Avoid the wheels touching the ground before the leg-to-suspension geometry has fully rotated into place, which would show the vehicle floating or clipping through its own tires. Keep the head-to-trunk fold consistent with the trunk's real proportions so the head does not appear compressed beyond what the trunk cavity could hold.", "bestFor": "Entertainment and gaming-adjacent brand content, sequel or \"reveal\" style social posts.", "premium": true}, {"id": "sport-motorcycle-mechanical-clunky-gear-driven-standing-reveal", "title": "Sport Motorcycle - Mechanical Clunky Gear-Driven Standing Reveal", "text": "Phase 1 - Hold: A sport motorcycle stands upright on its center stand under harsh directional light, chrome exhaust and matte tank surfaces contrasting sharply, a faint engine tick sound implied by subtle vibration. Phase 2 - Transformation begins: Visible gear teeth along the frame's spine engage first with an audible-feeling mechanical clunk, racking the front fork forward and down to become articulated arms while the fuel tank splits along a seam and rotates upward into a chest and helmet unit in three distinct, stepped motions rather than one fluid pass; the rear wheel detaches from its swingarm and rotates ninety degrees to form a torso base, each stage pausing briefly before the next gear-driven movement fires. - Every transition should read as distinctly mechanical and stepped, with visible linkages, pistons, or gear racks doing the work, in contrast to a smooth sedan-style transformation - this one has weight and friction to it. Phase 3 - Peak state: The motorcycle finishes as a lean, narrow-framed biped mecha, front wheel now serving as a circular chest emblem and rear wheel forming a stabilizing hip disc, standing in a slightly hunched, motorcycle-proportioned stance with a final gear-lock sound-implied click as it stabilizes. Guardrails: Because a motorcycle has far fewer body panels than a car, the resulting robot must stay visibly slimmer and more skeletal than a car-based mecha - do not let it gain implied bulk or extra plating from nowhere. Both wheels must remain clearly identifiable as circular elements somewhere in the final form, never disappearing into the design. Keep the stepped, clunky motion honest throughout - no phase should suddenly become smooth and seamless, as mixing transformation styles mid-sequence breaks internal consistency.", "bestFor": "Motorcycle brand entertainment marketing and action-sports adjacent social content.", "premium": true}, {"id": "sport-motorcycle-crouched-to-standing-reveal", "title": "Sport Motorcycle - Crouched-to-Standing Reveal", "text": "Phase 1 - Hold: A sport motorcycle leans on its kickstand in a dim garage bay, a single overhead work light casting a hard-edged shadow beneath it. Phase 2 - Transformation begins: The bike first tips upright off its kickstand and the frame buckles inward at a central hinge, compressing into a crouched, low mass as the fairings splay outward like unfurling plates to become bent knee guards; from this crouch, hidden leg struts telescope downward and lock outward while the handlebars retract into forearm plating, the whole figure slowly rising from its crouch to full height only in the final beat of the sequence. - The crouch-to-standing arc should feel like a coiled mechanism releasing - compressed and low first, unfolding upward last - distinct from transformations that go straight to a standing pose. Phase 3 - Peak state: The mecha reaches full upright height with knee guards clearly echoing the fairing shapes and a narrow chest plate bearing the tank's original color and seam lines, settling into a ready combat-adjacent stance with a slight knee flex retained rather than locking fully straight. Guardrails: The crouch phase must show genuine mass compression - the frame and panels visibly compacting downward - rather than simply playing the standing transformation at a lower camera angle. Knee and hip joints must bend in anatomically plausible directions matching a biped, never hyperextending backward. The fairing-to-knee-guard panels must retain the original paint scheme and panel seams so the connection to the source motorcycle stays legible even in the tightly folded crouch state.", "bestFor": "Motorsport and gaming crossover promotional content.", "premium": true}, {"id": "pickup-truck-fluid-seamless-crouched-to-standing-reveal", "title": "Pickup Truck - Fluid Seamless Crouched-to-Standing Reveal", "text": "Phase 1 - Hold: A full-size pickup truck sits in a dusty lot at golden hour, long shadows stretching from its wheels, tailgate closed and bed empty. Phase 2 - Transformation begins: The truck bed splits along its floor and folds upward and inward to form a broad back and shoulder span while the cab roof lowers and compresses to become a helmet, all in one continuous downward-crouching motion; the four wheels draw inward and rotate as the frame rails telescope into legs that bend at the knee, bringing the entire mass low to the ground in a wide, stable crouch before any vertical rise begins. - Every panel transition overlaps the next with rounded, fluid timing, avoiding hard mechanical stops, consistent with a premium, big-budget transformation feel scaled to the truck's larger mass. Phase 3 - Peak state: From the crouch, the figure rises in one smooth extension to a broad-shouldered, heavy-set mecha noticeably wider and more powerful-looking than a sedan-based form, tailgate panels now forming forearm guards, and it plants its feet with a grounded, heavy settle rather than a light landing. Guardrails: Given the truck's larger real-world mass, the final robot must read as visibly bulkier and broader than a sedan or motorcycle transformation - keep proportions consistent with a heavier source vehicle rather than reusing a slim mecha silhouette. All four wheels must remain traceable into the final leg and foot structure without any extra or missing wheel. The bed-to-back panel fold must preserve the truck bed's rectangular proportions in the resulting back plating, avoiding a shape that no longer relates to a cargo bed.", "bestFor": "Truck brand rugged-capability marketing and off-road adjacent entertainment content.", "premium": true}, {"id": "pickup-truck-rapid-mechanical-burst-standing-reveal", "title": "Pickup Truck - Rapid Mechanical Burst Standing Reveal", "text": "Phase 1 - Hold: A pickup truck idles at the edge of a construction yard, dust motes visible in a shaft of late afternoon light, engine implied to be running via a faint low vibration. Phase 2 - Transformation begins: Panels detach and reposition in fast, punctuated bursts rather than smooth overlap - the tailgate snaps down and rotates up behind the frame first, then both front doors kick outward and swing up to form shoulder pauldrons in a sharp single beat, followed immediately by the wheels retracting on hydraulic-looking struts and the cab snapping upright into a torso, each burst separated by a brief mechanical freeze-frame pause. - This staccato, high-energy timing is intentional and distinct from the fluid truck variant above - the emphasis is on powerful, sudden mechanical events rather than continuous flow. Phase 3 - Peak state: The mecha locks into a wide-stanced standing position with tailgate-derived back armor and door-derived shoulder plates clearly visible, finishing on a hard final stomp that settles dust around its feet, fully upright and battle-ready in posture. Guardrails: Keep each burst-and-freeze beat clean and readable - do not let two major panel movements happen in the exact same instant, since simultaneous chaotic motion is harder to track and more prone to geometry errors. The truck bed floor and side rails must reappear as a single coherent back-armor shape, not fragment into unrelated scattered plates. Maintain the same wheel count and relative wheel size throughout the retraction into the leg structures.", "bestFor": "Construction and industrial-adjacent brand campaigns and high-energy social ads.", "premium": true}, {"id": "off-road-suv-fluid-standing-reveal-with-reverse-variant", "title": "Off-Road SUV - Fluid Standing Reveal with Reverse Variant", "text": "Phase 1 - Hold: A rugged off-road SUV sits on a rocky outcrop under a clear blue sky, roof rack and mud tires catching crisp directional sunlight. Phase 2 - Transformation begins: The roof rack folds flat first and the roofline itself splits and slides back to reveal a rising head unit, while the front grille and bumper rotate downward and inward to form a broad chest plate; the rear cargo door swings open and refolds into a backpack-like frame across the shoulders as the four wheels swing under the body and lock into digitigrade-style legs, all transitions blending into one another with soft, weighted momentum. - Because this is an off-road vehicle, the resulting joints should imply extra articulation range and rugged, slightly asymmetric paneling consistent with an all-terrain vehicle rather than a sleek sedan. Phase 3 - Peak state: The SUV completes its transformation into a broad-footed, rugged mecha with the roof rack now forming a distinct back-mounted frame detail, settling into a wide stable stance suited to uneven terrain; the sequence then reverses in a mirrored fold-down, the legs bending back under the frame and the roofline sliding forward to close, ending back on the parked SUV. Guardrails: The roof rack must be tracked as a single consistent accessory throughout - it should not disappear during the humanoid phase only to reappear unexplained during the reverse fold. Leg joints should bend with a slightly more angular, digitigrade logic than the smoother sedan variant, but must remain internally consistent between the forward and reverse transformation rather than switching joint logic mid-sequence. All four mud tires must retain their tread pattern and size when they reappear as wheels in the reverse phase.", "bestFor": "Outdoor and adventure vehicle brand campaigns and dual-direction transformation showcase reels.", "premium": true}, {"id": "city-bus-heavy-fluid-standing-reveal", "title": "City Bus - Heavy Fluid Standing Reveal", "text": "Phase 1 - Hold: A city transit bus is parked at an empty curb in early morning light, its long flat side panels and rows of windows catching a soft diffused glow. Phase 2 - Transformation begins: The bus's roofline lifts and splits into two long panels that sweep back and down to form broad wing-like back armor, while the front windshield frame folds downward and inward to become a wide chest plate; the long body compresses telescopically from front to back like an accordion closing, shortening its overall length as the six wheels draw inward in pairs and rotate to form three-jointed legs, the entire compression happening as one slow, powerful continuous fold. - Given its scale, the motion should read as distinctly massive and slow, with visible structural give in the body panels as they compress, unlike the quicker sedan or motorcycle transformations. Phase 3 - Peak state: The bus resolves into an imposing, elongated mecha noticeably taller and heavier-set than any car-based form, window rows still faintly visible as segmented chest and torso paneling, standing with a wide tripod-like stance for stability given its converted six-wheel base. Guardrails: The telescoping body compression must shorten the form proportionally and consistently - the final torso length should look like it plausibly came from folding the bus's real length, not an arbitrarily shrunk or stretched result. All six wheels must be accounted for in the three-legged or multi-jointed lower structure, never collapsing to fewer wheels than the source vehicle had. Window panes should remain in a consistent grid pattern across the torso rather than warping or duplicating as the body compresses.", "bestFor": "Public transit or large-vehicle brand novelty marketing and attention-grabbing social content.", "premium": true}, {"id": "delivery-van-mechanical-gear-driven-reveal-with-reverse", "title": "Delivery Van - Mechanical Gear-Driven Reveal with Reverse", "text": "Phase 1 - Hold: A boxy delivery van sits at a loading dock, its side cargo doors closed, roof and panel lines flat and geometric under even daylight. Phase 2 - Transformation begins: Visible gear tracks along the van's undercarriage engage first, racking the wheels inward with an audible-feeling mechanical stepping motion, while the boxy cargo area splits down the middle and folds outward into two broad shoulder-and-arm units in three distinct clunky stages; the cab front folds down and under to become a squared-off chest and head unit, each major fold pausing on a hard mechanical stop before the next begins. - The overall style stays intentionally blocky and gear-driven throughout, matching the van's boxy source geometry rather than smoothing it into organic curves. Phase 3 - Peak state: The van completes into a squared, block-limbed mecha whose proportions clearly echo its boxy cargo shape, arms wide and rectangular, standing with a flat-footed, stable stance; it then reverses through the same stepped stages in reverse order, folding back down into the closed delivery van with a final settling clunk. Guardrails: Keep all body lines and proportions blocky and rectangular in both the humanoid and reverse vehicle form - introducing rounded, organic curves partway through breaks consistency with the source van's geometry. The cargo door panels must remain traceable as the arm and shoulder plating in both directions of the transformation, not replaced by unrelated new surfaces. Each gear-driven stop-motion beat must complete fully before the next begins, avoiding overlapping simultaneous folds that are more prone to clipping errors.", "bestFor": "Logistics and delivery brand novelty marketing and reversible transformation showcase content.", "premium": true}]},
    {"id": "liquid-metal-morph", "num": 30, "name": "Liquid Metal Morph", "shortName": "Liquid Metal", "group": "premium", "icon": "fa-droplet", "hue": 54, "desc": "Subjects melt into liquid metal and reform.", "intro": "Terminator-style liquid metal transformations - surface ripples, full-body melts, and point-origin spreads.", "promptCount": 8, "premium": true, "prompts": [{"id": "human-figure-full-body-melt-and-reform-into-same-figure", "title": "Human Figure - Full-Body Melt-and-Reform Into Same Figure", "text": "Phase 1 - Hold: A person stands in a relaxed neutral pose under even studio light, skin and clothing rendered normally, a faint natural sway of breathing. Phase 2 - Transformation begins: A thin band of chrome-like liquid sheen appears at the crown of the head and begins sliding downward, converting skin and fabric into a smooth reflective liquid surface as it passes, the figure's outline softening at the edges into gently drooping, gravity-affected folds; below the advancing liquid line the body remains solid a moment longer, creating a clear top-down conversion wave, until the entire figure has become a fluid mercury-toned silhouette that sags and pools slightly at the shoulders and base before catching itself. - The liquid must move with visible surface tension - highlights stretch and ripple across the surface as it flows, and the pooling at the bottom should behave like a heavy, viscous fluid resisting gravity rather than collapsing instantly into a puddle. Phase 3 - Peak state: The liquid mass ripples once more and the same top-down wave reverses, solidifying back into the original standing figure with clothing and features reappearing in the same order they dissolved, settling into the identical starting pose with a final soft ripple across the surface before going still. Guardrails: The conversion wave must move in one consistent direction and speed - avoid patches of the body randomly turning liquid out of sequence, which breaks the top-down logic. The liquid state must retain a clear silhouette matching the original figure's proportions at all times; do not let the mass shrink, widen, or lose the head-shoulders-torso-legs structure while in fluid form. Reflections on the liquid surface should track the implied studio lighting consistently rather than flashing or freezing independent of the surface's movement.", "bestFor": "Fashion and beauty brand transformation reels and high-concept entertainment content.", "premium": true}, {"id": "sports-sedan-surface-ripple-only-no-dissolve", "title": "Sports Sedan - Surface-Ripple-Only, No Dissolve", "text": "Phase 1 - Hold: A sports sedan sits under moody rim lighting on a dark reflective floor, its paint finish glossy and undisturbed, a faint highlight tracing the character line along its side. Phase 2 - Transformation begins: A ripple of liquid chrome sheen originates at the front bumper and travels backward along the body in a single continuous wave, temporarily turning the paint into a mercury-like reflective surface that distorts the surrounding studio reflections as it passes, while the car's actual body geometry never deforms or loses shape - only the surface quality changes from paint to liquid metal and back to paint just behind the leading edge of the wave. - The ripple should behave like a wave passing across a taut liquid skin stretched over a solid form beneath it, warping reflections dynamically but never causing the underlying panel lines or silhouette to bulge or sag. Phase 3 - Peak state: The ripple reaches the rear bumper and fades out, the car's paint returning fully to its original finish, with a last subtle shimmer along the trailing edge before the surface settles back to static gloss paint. Guardrails: Because this is a surface-only effect, the car's actual bodywork silhouette, wheel positions, and proportions must remain completely rigid and unchanged throughout - any melting, drooping, or shape distortion is out of scope for this variant and should not occur. The liquid sheen band should stay a consistent width as it travels rather than growing or shrinking unpredictably. Reflections within the liquid band must plausibly mirror the actual studio environment rather than showing generic or repeating reflection patterns.", "bestFor": "Automotive brand paint-finish and premium-material marketing content.", "premium": true}, {"id": "wristwatch-liquid-metal-emerging-from-one-point-and-spreading", "title": "Wristwatch - Liquid Metal Emerging From One Point and Spreading", "text": "Phase 1 - Hold: A mechanical wristwatch sits on a velvet display cushion, case and bracelet finished in brushed steel, a single soft key light tracing the crystal's edge. Phase 2 - Transformation begins: A small bead of liquid chrome appears at the crown and begins spreading outward across the case in an expanding, organic front, converting brushed steel into a smooth mirrored liquid surface as it advances over the case back, then the dial, then along the bracelet link by link, each link briefly liquefying and re-solidifying as the front passes through it. - The spread rate should slow slightly as it covers more surface area, consistent with a fluid front losing momentum, and the leading edge should show small tendrils and surface tension bulges rather than a perfectly clean geometric line. Phase 3 - Peak state: The liquid front fully envelops the entire watch, which now sits as a complete mercury-toned liquid replica of itself holding its exact shape, then the spread reverses back toward the crown, solidifying the case, dial, and bracelet in the same link-by-link order until only a small bead remains at the crown and disappears. Guardrails: The spreading front must maintain a single identifiable leading edge at all times - the liquid should not appear in disconnected patches ahead of the main front, which would break the point-of-origin logic. Bracelet links must liquefy and re-solidify individually in sequence rather than all at once, preserving the link-by-link mechanical structure of the band. The final liquid-covered watch must retain every proportion and detail silhouette of the original, including hands and dial markers, only rendered in a reflective liquid material rather than a melted or distorted shape.", "bestFor": "Luxury watch and jewelry brand premium material showcase content.", "premium": true}, {"id": "human-figure-melt-into-a-different-final-shape-sphere", "title": "Human Figure - Melt Into a Different Final Shape (Sphere)", "text": "Phase 1 - Hold: A person stands centered in an empty dark studio space, a single top-down light casting a soft pool of illumination, posture relaxed and still. Phase 2 - Transformation begins: The figure's edges begin softening simultaneously at the extremities - fingertips, hair, shoe soles - turning to liquid chrome first and drawing inward toward the torso's center of mass, the limbs shortening and thinning as their liquefied mass flows inward like tributaries feeding a river, the head and torso following last, collapsing downward and inward in a converging spiral. - The inward flow should visibly accelerate as more mass joins the central pool, consistent with increasing volume and momentum, and the surface should show swirling internal currents as different body-part-origin streams merge together. Phase 3 - Peak state: All liquefied mass consolidates into a single perfect reflective sphere hovering where the figure's center of mass once was, its surface calm and mirror-smooth, rotating slowly once to catch the light before the sequence ends on this new, deliberately non-human final form. Guardrails: The inward convergence must clearly originate from the extremities and flow toward the core - avoid the whole figure collapsing uniformly all at once, which loses the tributary logic. Because the final shape intentionally differs from the starting human silhouette, the transition must still conserve an implied consistent volume - the sphere's size should look proportional to the mass of a human body, neither too small nor implausibly large. The sphere's surface reflections must behave like a true liquid mirror tracking the studio's single light source, not a static painted texture.", "bestFor": "High-concept entertainment, music video, and experimental brand art content.", "premium": true}, {"id": "sneaker-full-object-melt-and-reform-into-same-shape", "title": "Sneaker - Full-Object Melt and Reform Into Same Shape", "text": "Phase 1 - Hold: A single athletic sneaker sits on a plain pedestal under a clean three-point studio light setup, fabric and rubber textures crisply visible. Phase 2 - Transformation begins: Liquid chrome sheen begins at the toe box and flows backward along the shoe in a steady wave, the fabric upper losing its weave texture and becoming smooth reflective liquid as the wave passes, the sole and heel following a beat behind; the whole object briefly sags at the arch as if softening under its own weight before the wave completes, the entire shoe now a liquid mercury silhouette that holds its recognizable shoe-shaped form rather than pooling flat. - The sagging at the arch should be subtle and momentary, implying viscosity without fully collapsing the recognizable silhouette, since a total collapse into a puddle would lose the object's identity for too long. Phase 3 - Peak state: The liquid shoe ripples once along its length and the same toe-to-heel wave reverses, restoring fabric texture and rubber sole detail in the same order it disappeared, settling back into the exact original sneaker with a final small shimmer across the laces. Guardrails: The recognizable shoe silhouette - toe box, arch, heel counter - must remain legible throughout the liquid phase; avoid the shape flattening into an unrecognizable blob even briefly, since this variant reforms into the same object and needs continuous silhouette tracking. Laces should liquefy and re-solidify as distinct thin strands rather than merging into the main body mass. The reflective surface must catch the three-point lighting setup consistently, with highlights moving smoothly as the wave travels rather than jumping discontinuously.", "bestFor": "Footwear brand premium material and limited-edition drop marketing.", "premium": true}, {"id": "perfume-bottle-surface-ripple-only-with-color-tinted-liquid-metal", "title": "Perfume Bottle - Surface-Ripple-Only With Color-Tinted Liquid Metal", "text": "Phase 1 - Hold: A faceted glass perfume bottle sits on a reflective black surface, a warm key light catching each facet edge, liquid visible inside the glass. Phase 2 - Transformation begins: A ripple of liquid metal tinted with a faint warm gold hue sweeps upward from the base of the bottle to the cap, temporarily converting the glass facets into a fluid metallic surface that still refracts light at angles matching where the facets used to be, the underlying bottle shape never deforming, only the material quality shifting from glass to liquid gold metal and back as the wave passes. - The tinted liquid should still behave with true metallic reflectivity, not simply a colored glass look - highlights should be sharp, hot, and directional rather than the soft diffused refraction of glass. Phase 3 - Peak state: The ripple exits through the cap and fades, the bottle returning fully to its original faceted glass appearance, with the interior liquid visible again exactly as it was in the opening hold frame. Guardrails: The faceted geometry of the bottle must remain perfectly rigid throughout - the ripple changes only surface material properties, and any softening or rounding of the facet edges during the metallic phase is a failure for this surface-only variant. The interior liquid seen through the glass must not be affected by the exterior ripple and should remain visually consistent before and after. The gold tint must stay uniform in hue across the entire rippling surface rather than shifting color partway through the wave.", "bestFor": "Fragrance and premium cosmetics brand material-transformation marketing.", "premium": true}, {"id": "human-figure-emerging-from-a-single-point-building-outward", "title": "Human Figure - Emerging From a Single Point, Building Outward", "text": "Phase 1 - Hold: An empty pedestal stands center-frame in a dark studio void, a single small bead of liquid chrome resting motionless at its center, softly lit from above. Phase 2 - Transformation begins: The bead begins pulling upward and outward, stretching into a thin rising column that widens unevenly as it climbs, roughly suggesting legs forming first from the base, then a torso thickening in the middle of the column, then arms budding outward from the sides and a head rounding out at the top, the entire figure built from the ground up as more liquid mass seems to feed upward into the growing form. - The build-outward motion should read as a continuous extrusion rather than separate parts appearing - think of it as the liquid being drawn upward and sculpted by unseen pressure, always maintaining a connected, unbroken mass. Phase 3 - Peak state: The liquid figure completes into a full human silhouette still rendered entirely in mirrored chrome, holding a natural standing pose, its surface solidifying from the feet upward into a matte human skin and clothing texture, finishing as a fully solid person standing where the bead once sat. Guardrails: The growth must proceed bottom-to-top in a single unbroken sequence - avoid limbs or the head appearing before the connecting mass has visibly grown to reach them, which breaks the extrusion logic. The liquid mass total volume should appear to grow rather than staying suspiciously constant, since a full human figure clearly requires more material than the original small bead implied at first glance - treat this as a deliberate stylized exception where the volume increase is implied smoothly rather than justified, without moments of sudden unexplained bulk appearing. The final solidified figure's proportions must read as a normal, believable human body, not stretched or asymmetric from the extrusion process.", "bestFor": "Entertainment, music video, and brand-origin-story concept content.", "premium": true}, {"id": "toaster-style-kitchen-appliance-full-melt-into-a-different-final-shape-abstract-wave-form", "title": "Toaster-Style Kitchen Appliance - Full Melt Into a Different Final Shape (Abstract Wave Form)", "text": "Phase 1 - Hold: A retro-styled toaster sits on a kitchen counter under warm morning light, chrome housing reflecting a soft window silhouette. Phase 2 - Transformation begins: The corners and top edges of the housing begin liquefying first, rounding off and dripping inward and sideways rather than downward, the rigid rectangular form softening into a loose, flowing mass that stretches horizontally as if being pulled by an unseen current, internal parts like the heating slots losing definition as the whole mass merges into one continuous liquid body. - The flow direction should feel deliberate and wind-swept rather than purely gravity-driven, giving the liquid a horizontal stretching quality distinct from a simple melt-downward effect, while still showing consistent surface tension and mirror-like reflectivity throughout. Phase 3 - Peak state: The liquid mass settles into a smooth, abstract sculptural wave shape with no remaining trace of the toaster's rectangular structure, its surface calm and fully reflective, holding this new abstract form as the final resting state with a slow single ripple confirming it has stopped moving. Guardrails: Because the final shape is intentionally abstract and unrelated to the toaster's original form, the transformation must still conserve a plausible total volume - the wave form should not appear larger or smaller than the mass of the original appliance. The horizontal stretching flow must remain internally consistent in direction throughout the phase, not switching between gravity-driven dripping and wind-swept stretching mid-transformation. Reflections across the final wave form must track its actual curved geometry accurately rather than appearing as a flat painted-on sheen.", "bestFor": "Home goods and appliance brand experimental art-direction campaigns and design-led social content.", "premium": true}]},
    {"id": "miniature-tiltshift-world", "num": 31, "name": "Miniature / Tilt-Shift World", "shortName": "Miniature", "group": "premium", "icon": "fa-city", "hue": 36, "desc": "Scenes shrink into toy-like dioramas.", "intro": "Tilt-shift miniature effects that turn real-world photos into dollhouse-scale worlds.", "promptCount": 9, "premium": true, "prompts": [{"id": "downtown-crossroads-shrink", "title": "Downtown Crossroads Shrink", "text": "Phase 1 - Hold: A wide daytime shot of a busy downtown intersection holds in full, crisp focus - pedestrians crossing, cars queued at a signal, all rendered at real-world scale with normal walking and driving speeds. Phase 2 - Transformation begins: A thin horizontal band across the middle third of the frame (roughly where the crosswalk and car roofs sit) stays sharp while a soft gaussian blur rolls in from the top of the frame downward and from the bottom of the frame upward simultaneously, closing in on that band like two curtains. As the blur band narrows, foot and vehicle traffic within the sharp zone perceptibly quickens to roughly 1.6x normal speed, while color saturation lifts and micro-contrast increases to mimic the plastic sheen of miniature figures. Guardrails: Keep the sharp band locked to a single consistent horizontal plane throughout - never let it drift onto a vertical building face or the sky, which breaks the diorama read instantly. Do not let any single pedestrian or car remain isolated at obvious full-size proportions near the lens; scale cues must shrink uniformly across the whole band. Avoid oversaturating skin tones on visible pedestrians into plastic-doll orange.", "bestFor": "Brand explainer intros and city-tourism social clips that want a playful \"world in a box\" opening hook.", "premium": true}, {"id": "mountain-valley-toybox", "title": "Mountain Valley Toybox", "text": "Phase 1 - Hold: A landscape photo of a mountain valley with a winding river and a distant train holds steady, full depth of field, natural cloud drift and water flow at real speed. Phase 2 - Transformation begins: A soft radial blur (not a straight band, since the valley recedes diagonally) opens from the frame's outer edges inward, tracing the terrain's actual depth contour so the valley floor near the river stays crisp while the mountain slopes and sky progressively soften. As the blur radius tightens, the river's flow and the train's movement both accelerate to roughly double speed, and cloud shadows sweep the slopes noticeably faster. Phase 3 - Peak state: The valley floor settles into a narrow ribbon of sharpness no wider than the train itself, with saturation pushed toward a slightly glossy, resin-model look, and the train now chugs across in quick, deliberate toy-motion. Guardrails: Because the terrain recedes at an angle rather than flat, the blur must follow the ground plane's perspective lines, not a flat horizontal band - a straight blur band on sloped terrain is the single most common tell that breaks this illusion. Keep the mountains' overall shape and snow-cap detail intact at reduced clarity rather than erasing them entirely. Do not speed up the clouds so much that they strobe or judder frame to frame.", "bestFor": "Travel and landscape brand content wanting a whimsical \"nature as a diorama\" transition.", "premium": true}, {"id": "living-room-dollhouse", "title": "Living Room Dollhouse", "text": "Phase 1 - Hold: A photo of an ordinary living room interior - sofa, coffee table, a person seated reading - holds in even, natural indoor light with normal ambient motion (a ceiling fan turning, curtains shifting slightly). Phase 2 - Transformation begins: Blur creeps in from the foreground floor and the ceiling simultaneously, converging toward the horizontal plane at coffee-table height where the seated person's torso sits, since interiors need a shallower, more compressed sharp zone than exterior shots. As the zone tightens, the ceiling fan's rotation and the seated person's page-turning both quicken subtly, and surface highlights on the coffee table and sofa fabric gain a slightly waxy, catalog-miniature sheen. Guardrails: A visible human figure is the hardest element to sell at miniature scale - keep proportions and posture completely intact and only quicken motion cadence, never shrink limbs or head size disproportionately, or the figure will look deformed rather than toy-sized. Keep window light consistent since interiors rely on it for scale cues; a sudden light change reads as a scene cut, not a lens effect. Avoid pushing the waxy sheen onto skin, which turns the person into an uncanny mannequin.", "bestFor": "Home brand or furniture advertising wanting a charming \"your room, but tiny\" moment.", "premium": true}, {"id": "coastal-boardwalk-fast-forward", "title": "Coastal Boardwalk Fast-Forward", "text": "Phase 1 - Hold: A photo of a coastal boardwalk with strolling visitors, a Ferris wheel in the background, and waves rolling in stays fully sharp at natural scale and speed. Phase 2 - Transformation begins: Two soft blur wedges close in diagonally from the top corners of the frame (since the Ferris wheel and horizon sit high and off-center rather than centered), leaving a diagonal sharp corridor along the boardwalk itself. Foot traffic and the Ferris wheel's rotation both ramp up to near-double speed as the corridor narrows, while wave sets arriving on the shore compress into quicker, choppier repeats to match the accelerated human motion. Phase 3 - Peak state: The corridor settles into a slim diagonal strip, the Ferris wheel now spinning at a brisk, clockwork pace, and the whole boardwalk takes on the glossy, high-saturation look of a resin seaside model. Guardrails: Because the sharp zone here is diagonal rather than horizontal, make sure the blur wedges mirror each other's angle exactly - mismatched wedge angles make the depth cue feel arbitrary rather than lens-driven. The Ferris wheel's rotation speed and the wave frequency must accelerate in the same proportion, since two ambient motions moving at different accelerated rates breaks the single-scale illusion. Do not let sea spray or foam detail vanish entirely under the blur; keep faint texture so the water still reads as water.", "bestFor": "Tourism board and hospitality social content wanting a nostalgic \"seaside in miniature\" reveal.", "premium": true}, {"id": "park-bench-solitude-gently-shrunk", "title": "Park Bench Solitude, Gently Shrunk", "text": "Phase 1 - Hold: A photo of a person sitting alone on a park bench under a large tree, with joggers and cyclists passing in the background, holds at natural scale, soft breeze moving the leaves. Phase 2 - Transformation begins: A shallow, gentle blur (mild intensity, since this prompt targets a subtle rather than extreme miniature effect) settles in above and below a band that includes the bench and the lower tree canopy, applied at only about 60% strength compared to a full tilt-shift look. Background joggers and cyclists pick up a light, barely-there speed increase - enough to feel slightly brisk but not cartoonish - while leaf flutter in the canopy quickens just perceptibly. Guardrails: Because this is a low-intensity variant, resist the urge to oversaturate colors the way a full-strength miniature effect would - an emotional, quiet composition oversaturated into candy tones will feel tonally wrong. Keep the seated person's stillness completely believable; do not add any speed-up to their body, only to background elements, since a fidgeting main subject undercuts the \"solitude\" mood. The blur must stay mild enough that facial detail on the seated person remains legible throughout.", "bestFor": "Lifestyle and mental-wellness brand content wanting a gentle, artistic reframe rather than a novelty effect.", "premium": true}, {"id": "harbor-skyline-extreme-diorama", "title": "Harbor Skyline, Extreme Diorama", "text": "Phase 1 - Hold: A high, elevated photo of a harbor skyline with boats docked, cranes loading containers, and distant skyscrapers holds in full clarity, all elements at true scale. Phase 2 - Transformation begins: This is the highest-intensity variant in the set - blur rolls in aggressively from top and bottom within the first quarter of the transformation, converging fast onto a very thin sharp line at the dock level. Crane arms swinging containers and boats bobbing at their moorings both jump to nearly 2.5x speed as the blur tightens, and reflections on the harbor water shimmer in quick, repetitive ripples to reinforce the resin-water look of high-end miniature photography. Phase 3 - Peak state: The skyline settles into an extreme, saturated diorama with only a hairline of sharp focus at the waterline, cranes ticking back and forth like clockwork toys, and the overall image reading unmistakably as a tabletop model photographed macro-close. Guardrails: At this extreme intensity, verify the hairline sharp zone stays anchored to the waterline and dock edges rather than sliding onto the skyscraper bases, since even one frame of misplaced focus at this blur strength reads as a rendering error rather than style. Crane and boat motion must accelerate together at the same rate; independent speeds at this intensity look chaotic rather than mechanical. Keep container colors and boat hulls crisp within the sharp band - extreme blur elsewhere should not bleed saturation loss into the in-focus zone.", "bestFor": "Logistics, shipping, or urban-planning brand content wanting a bold, unmistakable \"toy world\" statement piece.", "premium": true}, {"id": "snowy-village-music-box", "title": "Snowy Village Music-Box", "text": "Phase 1 - Hold: A photo of a snow-covered alpine village with smoke rising from chimneys and a few figures walking the main street holds in natural winter light, smoke drifting slowly upward. Phase 2 - Transformation begins: Blur folds in from the frame's top (sky and mountain peaks) and bottom (foreground snowbank) toward the village rooftops, which stay crisp as the natural focal anchor. Chimney smoke, which is the trickiest ambient element here, is sped up only moderately (about 1.3x) and thinned slightly in density so it still reads as smoke rather than fog, while the walking figures' gait quickens in small, even steps. Guardrails: Chimney smoke is the highest failure-risk element in this prompt - sped up too much it turns into an unnatural strobing puff; the guardrail is to cap its speed increase well below the ground-level motion speed and preserve its soft, translucent edges. Snow texture on rooftops should gain a light sheen but not go glassy or icy-looking, which would misread as a material change rather than a scale change. Keep the walking figures' silhouettes and coat colors stable frame to frame so they don't flicker as they quicken.", "bestFor": "Holiday-season brand campaigns and greeting-card style social content.", "premium": true}, {"id": "person-in-park-full-body-miniature-reveal", "title": "Person in Park, Full-Body Miniature Reveal", "text": "Phase 1 - Hold: A photo of a person standing in a park clearing, arms slightly spread enjoying the sun, with a walking path and distant trees behind them, holds in natural full-body scale and even lighting. Phase 2 - Transformation begins: Blur closes in from top and bottom around a band centered on the person's waist-to-shoulder height, since a standing full-body subject requires the sharp zone to be built around their own vertical center rather than an arbitrary horizontal line in the scene. Background elements - a few distant walkers and swaying tree branches - speed up moderately as the band tightens, while the standing person's own motion (hair and clothing lifted slightly by wind) is allowed only the smallest speed increase to avoid distorting their pose. Phase 3 - Peak state: The clearing settles into a diorama with the person as its centerpiece figure, background walkers moving in brisk toy-steps, tree branches swaying in quick little arcs, and the person's clothing and hair rendered with a light glossy miniature-figure sheen while their face and posture remain fully recognizable. Guardrails: The standing person is the highest-risk element for identity loss - keep facial features, proportions, and pose completely stable and apply the miniature \"look\" only through lighting sheen and the surrounding motion speed-up, never through actual body distortion or scale shrinking within the frame. Avoid letting the blur band cut across the person's face; it should frame their torso so their expression stays legible as the emotional anchor. Do not speed up the person's own hair or clothing motion beyond a gentle flutter, since fast personal motion combined with a static pose looks like a glitch rather than a stylistic effect.", "bestFor": "Personal social content and creator reels wanting a charming \"shrink yourself into a toy world\" moment.", "premium": true}, {"id": "farmland-patchwork-aerial-drift", "title": "Farmland Patchwork, Aerial Drift", "text": "Phase 1 - Hold: An aerial-angle photo of patchwork farmland with tractors working the fields and a country road cutting through holds in full sharpness, tractors and a distant truck moving at real speed. Phase 2 - Transformation begins: Because this is a top-down aerial composition, blur rolls in as a soft vignette-style ring closing from the frame's outer edge toward a central sharp island around the crossroads where the tractors work, rather than a horizontal band. As the sharp island shrinks, the tractors' movement and the truck's travel along the road both accelerate to roughly 1.8x, and the field-color patchwork gains richer, candy-like saturation typical of scale-model farm sets. Guardrails: For this aerial, radially-blurred composition, keep the sharp island's edge soft and gradual rather than a hard-edged circle, since a crisp circular cutoff reads as a vignette filter rather than optical depth-of-field. Tractor and truck motion should accelerate together proportionally; if the truck on the road moves faster than the tractors in the field, the scene loses its single coherent toy-scale logic. Preserve the natural field-line patchwork geometry exactly - warping or bending the field boundaries during the saturation push will break the aerial photograph's credibility before it even reaches diorama status.", "bestFor": "Agricultural brand storytelling and aerial travel content wanting a satisfying \"patchwork world\" close-up feel.", "premium": true}]},
    {"id": "double-exposure-reality-blend", "num": 32, "name": "Double Exposure / Reality Blend", "shortName": "Double Exposure", "group": "premium", "icon": "fa-clone", "hue": 30, "desc": "Two realities blend inside a silhouette.", "intro": "Surreal double-exposure composites where landscapes, cities, or textures fill a portrait or object silhouette.", "promptCount": 10, "premium": true, "prompts": [{"id": "forest-within-the-silhouette", "title": "Forest Within the Silhouette", "text": "Phase 1 - Hold: A profile portrait of a person holds still against a plain dark backdrop, lit cleanly so their silhouette edge is crisp and their expression calm. Phase 2 - Transformation begins: Within the silhouette's interior only, a dense pine forest image begins to fade in from roughly 0% to full visibility, entering first as faint tree-trunk verticals near the collarbone and rising upward through the neck and jaw like ink drawn up a wick. The forest's own internal light (dappled sun through canopy) brightens in sync as it climbs, while the silhouette's outer edge is held perfectly opaque and unchanged throughout so the person's contour never softens or blurs. Guardrails: The single biggest failure risk here is the forest imagery leaking past the silhouette's edge into the dark backdrop, which destroys the contained \"world inside a person\" read - the fill must be strictly masked to the interior at all times. Do not let the forest's brightness overpower the silhouette edge's contrast; the outline must stay legible as a human profile even at the composite's brightest moment. Avoid introducing any forest element (a bird, a branch) that pokes past the head or shoulder contour, since that breaks the illusion that the person is a vessel rather than part of the landscape.", "bestFor": "Nature and wellness brand campaigns wanting a poetic \"person as landscape\" emotional hook.", "premium": true}, {"id": "city-lights-cross-fade-portrait", "title": "City Lights Cross-Fade Portrait", "text": "Phase 1 - Hold: A front-facing portrait of a person holds in soft studio light, neutral expression, plain backdrop, fully sharp and photographic. Phase 2 - Transformation begins: A night cityscape of illuminated skyscrapers begins a true cross-fade across the ENTIRE frame simultaneously (not confined to the silhouette), rising in opacity evenly from corners and center alike, so for a middle stretch both the portrait and the skyline are visible at roughly equal 50% strength, overlapping like genuine double-exposed film. As the cityscape climbs past the midpoint, the portrait's opacity recedes at the same rate it entered, keeping total visual density constant so the image never looks washed out or overexposed. Phase 3 - Peak state: The composite settles at a balanced blend where the person's facial features remain ghost-visible through the skyline's window-lights and building lines, city lights appearing to sit like constellations across the face and shoulders, neither image fully dominant. Guardrails: Because this is a true full-frame cross-fade rather than a masked fill, the greatest risk is both images fighting for the same visual weight and producing a muddy gray blur - the fix is keeping combined opacity capped so the sum of both layers never exceeds full visual density at any single frame. Keep the portrait's eyes and facial structure as the brightest, highest-contrast elements throughout the blend so the human subject remains the anchor the viewer's eye returns to. Avoid letting building edges align directly over the eyes or mouth in a way that reads as damage or scarring rather than an artistic overlay.", "bestFor": "Urban lifestyle and nightlife brand content wanting a moody \"person as the city\" identity piece.", "premium": true}, {"id": "galaxy-eyes-cosmic-silhouette-fill", "title": "Galaxy Eyes, Cosmic Silhouette Fill", "text": "Phase 1 - Hold: A close three-quarter portrait holds steady with the person's eyes open, calm expression, softly lit against a black backdrop so the silhouette edge is strong. Phase 2 - Transformation begins: A deep-space nebula and starfield image begins filling the silhouette's interior starting specifically from the eyes outward, the pupils becoming small windows of star-flecked violet and teal that then bloom outward across the iris, then the face, then down through the neck and shoulders in a slow radial spread. Star density and nebula color intensity increase as the fill radius expands, and a few individual bright points are timed to \"twinkle\" on only after the fill has passed their location, giving the spread a felt sense of settling rather than simply appearing. Guardrails: Since the fill originates at the eyes, the highest risk is the eyes reading as blank or damaged rather than deliberately cosmic - keep a faint suggestion of iris shape and a bright pinpoint highlight within the star-fill so the eyes still read as eyes, just made of galaxy. Keep the radial spread's leading edge soft and gradient rather than a hard-edged blob expanding outward, which would look like a stain rather than a cosmic bloom. As with any silhouette-fill, never let starfield or nebula haze extend past the exact head/shoulder contour into the backdrop.", "bestFor": "Music, fashion, and entertainment content wanting a striking \"cosmic being\" visual centerpiece.", "premium": true}, {"id": "ocean-horizon-edge-bleed-portrait", "title": "Ocean Horizon Edge-Bleed Portrait", "text": "Phase 1 - Hold: A side profile portrait holds against a plain light backdrop, hair loose, expression serene, lit with soft even light. Phase 2 - Transformation begins: Rather than filling the silhouette's interior or cross-fading the whole frame, an ocean horizon image bleeds inward strictly from the silhouette's outer edge, the hairline and shoulder contour becoming the boundary where water texture and horizon light seep a short distance into the portrait like a watercolor wash creeping in from a wet border. The bleed depth is shallow and consistent - roughly one-tenth of the silhouette's width - and travels around the entire contour at the same pace, so no single area (just the hair, or just the shoulder) races ahead of the rest. Phase 3 - Peak state: The portrait settles with a consistent ring of ocean-horizon texture and color hugging the entire silhouette edge like a glowing tide line, while the interior of the face and torso remains the original clean photographic portrait, untouched by the blend. Guardrails: Edge-bleed's core failure mode is uneven bleed depth - if the water texture creeps three times deeper into the hair than into the shoulder, the effect reads as an accidental erasure rather than a designed border, so bleed depth must be tightly matched around the full contour. Keep the interior portrait completely free of any ocean texture; this prompt's entire visual logic depends on a clean untouched core with only the border transformed. Avoid letting the horizon line itself (the brightest, highest-contrast part of the ocean image) land across the face, since a bright horizontal bar crossing the eyes reads as a compositing error.", "bestFor": "Beauty and skincare brand content wanting a calm, elegant \"serenity\" visual metaphor.", "premium": true}, {"id": "autumn-field-silhouette-full-figure", "title": "Autumn Field Silhouette, Full Figure", "text": "Phase 1 - Hold: A full-body silhouette of a person standing in a relaxed pose holds against a plain backdrop, backlit slightly so the outline is razor-sharp and entirely black. Phase 2 - Transformation begins: An autumn field of tall golden grass with a few scattered trees fades in within the silhouette starting from the ground up - first at the feet and ankles, the grass texture rising through the legs, torso, and finally the shoulders and head, mimicking the way a field itself would visually \"grow\" upward. A light wind-driven sway is introduced into the grass texture only after it has filled a given body region, so the lower body's grass is already gently swaying while the upper body is still mid-fill. Guardrails: Because the fill direction is bottom-to-up across a full standing figure, keep the transition boundary (where filled grass meets still-black silhouette) as a soft horizontal gradient that moves at a steady, even pace - an uneven or diagonal boundary breaks the \"growing upward\" logic the prompt depends on. Do not let the scattered trees exceed shoulder height or poke past the head contour. Keep the grass sway subtle in the lower body once filled so it doesn't distractingly out-animate the still-filling upper body during the transition.", "bestFor": "Seasonal fashion and outdoor lifestyle content wanting a full-figure \"human as nature\" statement shot.", "premium": true}, {"id": "marble-texture-bleed-on-still-life", "title": "Marble Texture Bleed on Still Life", "text": "Phase 1 - Hold: A still-life photo of a simple ceramic vase on a table holds in neutral studio light, fully sharp and ordinary. Phase 2 - Transformation begins: Rather than a portrait, this is an object + abstract texture blend: a polished marble-veining texture begins bleeding in from the vase's base upward along its surface, following the vase's actual curved contours (not a flat overlay) so the veining appears to wrap correctly around the object's form. As the marble texture climbs, the vase's surface sheen shifts gradually from matte ceramic to a cool, faintly glassy polish, and the table surface beneath begins to pick up a soft reflected gleam consistent with the marble's light behavior. Phase 3 - Peak state: The vase settles as a fully marble-veined object from base to rim, its form completely unchanged in shape, now reading as a carved marble vessel with veining that follows its curvature correctly and a matching soft reflection pooling beneath it on the table. Guardrails: The primary risk with texture-on-object blends is the veining pattern reading as a flat decal rather than a wrapped surface - the guardrail is ensuring the marble lines curve and compress correctly around the vase's silhouette, denser where the surface turns away from camera, sparser on the frontal plane. Keep the vase's exact shape, proportions, and any handles or rim details completely unchanged; only surface material should transform. Do not let the reflected gleam on the table appear before the marble texture has actually reached the vase's base, since a reflection preceding its source reads as a lighting error.", "bestFor": "Product and homeware brand content wanting an elegant \"ordinary object becomes precious\" reveal.", "premium": true}, {"id": "skyline-silhouette-reverse-cross-fade", "title": "Skyline Silhouette, Reverse Cross-Fade", "text": "Phase 1 - Hold: A portrait holds with the person facing three-quarters away from camera, a dense downtown skyline already visible softly in the deep background, both elements sharp in their own depth planes. Phase 2 - Transformation begins: This prompt inverts the usual direction - instead of a second image entering the portrait, the portrait's own edge detail (hair strands, jacket texture, shoulder line) begins dissolving outward into the skyline behind it, the boundary between subject and background softening and interleaving so building edges start appearing to pass through where the person's silhouette used to be solid. The dissolve begins at the frame's outer edges of the silhouette (hair tips, jacket hem) and works inward, leaving the person's core torso and head solid the longest. Guardrails: Because this reverses the typical fill direction, the key guardrail is stopping the dissolve before it reaches the face or torso core - if the dissolve is allowed to consume the entire figure, the composite loses its subject entirely rather than producing a blend. Keep the skyline's geometry showing through the translucent edges logically aligned with the actual background buildings already visible, not a mismatched second skyline. Avoid a hard, sudden cutoff between the solid core and dissolving edge; the transition band must be gradual to avoid a visible seam line.", "bestFor": "Fashion editorial and creative agency reels wanting an artful \"dissolving into the city\" closing shot.", "premium": true}, {"id": "storm-clouds-cross-fade-landscape", "title": "Storm Clouds Cross-Fade Landscape", "text": "Phase 1 - Hold: A calm daytime photo of an open plain landscape under clear sky holds steady, grass swaying gently, no storm elements present. Phase 2 - Transformation begins: A separate image of a dramatic storm-cloud formation cross-fades across the sky portion of the frame specifically (not the full frame, since the ground plane should stay grounded in reality while only the sky reality shifts), opacity rising smoothly from the horizon line upward to the top of frame. As the storm image strengthens, ambient light across the grass dims and cools in direct proportion to the cloud opacity, and the grass sway subtly quickens as if wind is picking up, tying the ground-level physics to the sky blend even though only the sky itself is a composited image. Phase 3 - Peak state: The sky has fully cross-faded into the storm-cloud image, dramatic and dark, while the grass plain below remains the original photographic reality but now lit and moving consistently with the new stormy sky above it, selling the blend as a single coherent moment rather than two mismatched layers. Guardrails: The core risk in a partial-frame cross-fade is a visible seam at the horizon where the two image sources meet - the fix is ensuring the storm image's own horizon and the original photo's horizon align in height and perspective before the fade begins. Ground lighting must dim in exact proportion to sky opacity; a still-bright ground under a fully dark storm sky is the fastest way to break believability. Keep grass wind response subtle and physically plausible rather than whipping violently, since storm arrival typically builds gradually rather than instantly.", "bestFor": "Weather, climate, and outdoor gear brand content wanting a dramatic mood-shift establishing shot.", "premium": true}, {"id": "shattered-glass-edge-bleed-object", "title": "Shattered Glass Edge-Bleed Object", "text": "Phase 1 - Hold: A product-style still photo of a smartphone resting on a table holds in clean, even studio light, screen dark, fully intact and ordinary. Phase 2 - Transformation begins: An abstract shattered-glass texture bleeds inward from the phone's four edges toward the center, cracks appearing to originate exactly at the physical edge of the device and spider inward following realistic fracture geometry (each crack branching at acute angles, none crossing itself). As the crack network spreads inward, the color beneath it subtly shifts to a prismatic, light-refracting sheen only within the cracked regions, while area not yet reached by the cracks remains completely unaffected. Guardrails: Fracture geometry is the make-or-break detail here - cracks must branch and taper the way real glass actually fractures (thinner as they extend, occasional branching, never a perfect grid or symmetrical pattern), since obviously artificial crack patterns instantly read as a filter rather than a physical event. Keep the device's actual silhouette and edges completely intact and unbroken; this is a surface-texture bleed, not a structural deformation, so the phone must never appear physically bent or fragmented apart. Do not let the prismatic sheen spread faster than the crack network itself - color change must always trail the crack edge, never lead it.", "bestFor": "Tech and gadget brand content wanting an edgy, abstract \"fracture as art\" product visual.", "premium": true}, {"id": "twin-faces-cross-fade-emotion-shift", "title": "Twin Faces Cross-Fade, Emotion Shift", "text": "Phase 1 - Hold: A portrait holds on a person with a neutral, composed expression, plain backdrop, even lighting, fully sharp. Phase 2 - Transformation begins: A second photograph of the same environment and lighting setup - but with the subject mid-laugh, head tilted slightly differently - begins a true cross-fade over the entire frame, rising in opacity evenly so both expressions genuinely overlap during the midpoint, mouth position and eye-crease lines from both images visible simultaneously like a long-exposure capturing two consecutive expressions in one frame. The neutral expression's opacity recedes at the exact rate the laughing expression's opacity rises, keeping total density constant throughout. Phase 3 - Peak state: The composite settles fully into the laughing expression, the neutral version now fully faded out, completing what reads as a single continuous emotional shift captured through overlapping exposures rather than a simple expression change. Guardrails: Because both source images are the same person in slightly different head positions, the biggest risk is doubled or ghosted facial features (two mouths, four eyes) becoming visible at the same opacity level rather than one cleanly overtaking the other - the fix is ensuring the two images are pre-aligned on the eyes before the fade begins so overlap is minimal at any single frame. Keep the lighting and backdrop identical between both source states; any mismatch in shadow direction between the two images will read as a lighting glitch rather than a double exposure. Avoid letting the transition linger too long at exact 50/50 opacity, since that midpoint is where doubled features are most visible and should pass through quickly rather than being a resting state.", "bestFor": "Personal creator content and emotive social reels wanting a poetic \"one moment becomes another\" transition.", "premium": true}]},
    {"id": "statue-awakening", "num": 33, "name": "Statue Awakening", "shortName": "Statue", "group": "premium", "icon": "fa-monument", "hue": 24, "desc": "Stone comes to life - or flesh turns to stone.", "intro": "Statue awakening and petrification prompts with believable texture-spread patterns.", "promptCount": 9, "premium": true, "prompts": [{"id": "marble-figure-awakening-from-the-eyes", "title": "Marble Figure, Awakening from the Eyes", "text": "Phase 1 - Hold: A classical white marble statue of a seated figure holds motionless in a gallery-style setting, veined stone surface fully matte and rigid, eyes rendered as smooth blank marble. Phase 2 - Transformation begins: Color and moisture first appear in the eyes - the blank marble surface there softens to a wet, reflective sheen and a natural iris color blooms in from the pupil outward, followed immediately by the eyelids gaining the faintest pinkish translucency of living skin. From that point the color and texture change spread outward across the face in a slow radial wave, cheeks softening from hard stone to skin texture, lips gaining color and losing their chiseled rigidity, while the rest of the body remains solid unmoving marble throughout this phase. Phase 3 - Peak state: The face is now fully living skin with warm color and micro-texture (pores, subtle asymmetry) while the neck downward is still solid white marble, the figure's eyes now blinking once, slowly, as the clearest signal that the awakening has taken hold at the head and is poised to continue downward. Guardrails: The eyes are the highest-risk detail - if color blooms in unevenly (one eye ahead of the other, or iris color appearing patchy) it reads as a rendering glitch rather than a deliberate awakening origin, so both eyes must change in careful sync. Keep the boundary between living skin and remaining marble as a soft gradient collar at the neck, not a hard graphic line, since a sharp cutoff looks like a mask rather than a spreading transformation. Do not let the statue's pose shift or the head turn during this phase; the first movement should be reserved for eye-blink only, with any larger gesture implied as the next stage rather than shown here.", "bestFor": "Museum, gallery, and art-brand social content wanting a reverent, cinematic \"art comes alive\" moment.", "premium": true}, {"id": "bronze-warrior-first-hand-movement", "title": "Bronze Warrior, First Hand Movement", "text": "Phase 1 - Hold: A bronze statue of a standing warrior figure holds in a fixed battle-ready stance, the surface showing typical bronze patina - greenish oxidation streaks over a dark metallic base, fully rigid. Phase 2 - Transformation begins: Change originates at the statue's right hand gripping a weapon hilt - the bronze there begins to warm in tone first, dark patina lightening to a warmer bronze-gold, then to the pinkish tone of living skin, with individual fingers gaining the ability to flex slightly, tendons visibly shifting beneath the surface as the hand tightens its grip incrementally. This warming and softening spreads up the wrist and forearm next, the metallic sheen giving way to skin texture and fine hair, while the rest of the body including the face remains unmoving solid bronze. Guardrails: Because bronze has a specific oxidation patina, the color transition must pass through the metal's own warming tones (dark patina to warm gold) before introducing skin color, rather than jumping straight to pink flesh, or the material logic breaks. Keep finger movement small and mechanical at first - a full dramatic fist clench this early reads as premature and skips the \"waking up\" gradualness the prompt is built around. The spread boundary at the forearm must remain a soft, uneven transition line (mimicking how patina naturally wears unevenly) rather than a clean geometric edge, since bronze corrosion never forms a perfectly straight boundary.", "bestFor": "Historical, gaming, and fantasy entertainment content wanting a tense \"hero awakens\" origin beat.", "premium": true}, {"id": "granite-guardian-base-upward-awakening", "title": "Granite Guardian, Base-Upward Awakening", "text": "Phase 1 - Hold: A rough-hewn granite statue of a robed guardian figure holds at the entrance of a stone structure, the granite's coarse, speckled texture and dull gray tone fully consistent top to bottom. Phase 2 - Transformation begins: The change starts at the statue's feet and the base of its robe, the coarse granite texture there smoothing into woven fabric folds and the gray tone shifting toward the warm color of aged cloth, this transformation rising steadily up the robe like water filling a vessel from the bottom. As the wave passes the knees and then the waist, faint robe movement begins - small folds shifting as if settling under real fabric weight for the first time - while everything above the rising boundary remains solid, coarse granite. Phase 3 - Peak state: The transformation has climbed to chest height, the lower two-thirds of the figure now soft draped fabric over an implied living form beneath, while the shoulders, arms, and face remain unchanged rough granite, the boundary itself visibly rippling slightly as it prepares to continue upward. Guardrails: Granite's coarse, speckled texture must visibly smooth out in grain and porosity as it converts to fabric, not just change color - a color-only shift while retaining stone's rough speckle pattern will look like painted rock rather than an actual material change. Keep the rising boundary's edge irregular and organic (following the robe's natural fold lines) rather than a flat horizontal cutoff, since a perfectly level transformation line looks like a digital wipe effect rather than an upward-spreading awakening. Do not introduce any facial or hand movement in this phase since the wave has not reached them yet; showing motion above the boundary line contradicts the base-upward mechanic the prompt establishes.", "bestFor": "Fantasy game trailers and mythic-themed brand content wanting a slow-building guardian reveal.", "premium": true}, {"id": "living-subject-petrification-from-one-hand", "title": "Living Subject, Petrification from One Hand", "text": "Phase 1 - Hold: A person stands in a relaxed pose in an ordinary setting, fully alive and naturally lit, hands visible at their sides. Phase 2 - Transformation begins: The change begins at the fingertips of one hand, skin tone there desaturating first to a cool gray while the surface texture roughens, fine wrinkles and pores giving way to a stony, faintly crystalline grain, and finger movement stiffens noticeably, each joint locking slightly more than the last as the gray spreads across the knuckles and into the palm. This stone conversion advances up the wrist and forearm in a slow, visible crawl, the skin-to-stone boundary carrying a faint hairline crack pattern just ahead of the fully converted gray, like a frost line advancing over glass, while the rest of the body remains completely normal and mobile. Guardrails: The skin-to-stone boundary must show that thin hairline crack pattern advancing just ahead of the full color change, since color change with no textural crack precursor looks like a simple discoloration filter rather than an actual mineralization process. Keep joint stiffening progressive and localized to the affected region only - the untransformed arm and body must retain full, fluid mobility to make clear the effect is spreading, not universal. The person's facial expression reacting to their own hand is important information for the viewer; do not let the face remain blank or unaware, since a subject seemingly oblivious to visible stone spreading up their own arm undercuts the transformation's stakes.", "bestFor": "Horror and supernatural entertainment content wanting a slow-dread body-horror opening beat.", "premium": true}, {"id": "living-statue-model-slow-full-body-petrification", "title": "Living Statue Model, Slow Full-Body Petrification", "text": "Phase 1 - Hold: A person poses on a plinth in the style of a living statue performer, already in still, statuesque posture, fully colored and lifelike, breathing subtly. Phase 2 - Transformation begins: Rather than a limb origin, this transformation spreads from the base of the plinth upward through the feet first, matching the classic statue-awakening mechanic in reverse - skin desaturating to a pale bronze-gray and gaining a subtle metallic sheen at the ankles, this wave rising steadily through the calves, knees, and thighs, with the performer's breathing becoming shallower and their remaining mobile upper body holding progressively stiffer poses as the wave approaches the torso. Each region loses fine detail (individual skin texture smoothing into a uniform statue-like surface) exactly as the color wave reaches it, never before. Phase 3 - Peak state: The figure is now bronze-toned and rigid from the plinth up through the waist, breathing barely perceptible, while the torso, arms, and face remain living flesh holding a final, deliberate pose, caught at the precise threshold between person and statue. Guardrails: Because this begins at a plinth rather than a hand or the eyes, keep the base-upward wave's leading edge horizontal but gently uneven (following natural anatomy contours like the ankle bone and knee crease) rather than a razor-flat line, or the effect looks like a digital fill-level rather than organic spreading. Breathing must visibly diminish in step with how much of the torso has been reached, not stop abruptly all at once, since sudden total stillness while the chest is still visibly flesh-toned is a mismatch between visual and implied physical state. Do not let the still-living upper body appear panicked or in motion; the performer's living-statue training context means their reaction should be a held, controlled expression, not a struggle.", "bestFor": "Street-performance and avant-garde art content wanting an eerie, controlled slow-freeze sequence.", "premium": true}, {"id": "bronze-falcon-statue-wings-awakening", "title": "Bronze Falcon Statue, Wings Awakening", "text": "Phase 1 - Hold: A bronze statue of a falcon perched on a stone pillar holds with wings folded, dark oxidized patina uniform across the entire form, completely motionless. Phase 2 - Transformation begins: The awakening starts at the eyes, a small point of amber color appearing in the blank bronze eye sockets first, followed immediately by the beak's edge softening from hard metal to a faint keratin sheen. From there, color spreads outward across the head and down the neck feathers, individual feather edges gaining definition and a warm brown-and-white plumage pattern replacing the uniform patina, while the folded wings and talons remain fully bronze and rigid throughout this phase. Guardrails: Bronze statues of animals rely heavily on plumage or fur pattern to read as \"alive,\" so the guardrail here is ensuring feather texture and pattern emerge together, not color arriving before texture definition (which would look like the bird's head was simply painted rather than transformed). Keep the eye's color bloom small and precise, confined to the socket, since bronze eye awakenings that bleed color onto surrounding metal read as a paint spill rather than a focused origin point. The talons gripping the pillar must remain completely rigid and unchanged in this phase; any early flex there contradicts the head-first spread the prompt establishes.", "bestFor": "Nature documentary-style and heritage/monument brand content wanting a majestic animal-awakening beat.", "premium": true}, {"id": "living-dancer-petrification-from-the-eyes-outward", "title": "Living Dancer, Petrification from the Eyes Outward", "text": "Phase 1 - Hold: A dancer holds a mid-motion pose in a spotlight, fully alive, expressive eyes open, body caught in a graceful extended line. Phase 2 - Transformation begins: The stone change begins precisely in the eyes, the natural color and wet reflective sheen fading to a flat, matte gray stone finish, pupils and irises smoothing into featureless marble-like orbs, while the eyelids' texture roughens slightly around the socket edge first. This grayness spreads outward across the face next, cheeks and forehead losing skin texture and warmth in a slow bloom, jawline and ears following, while the dancer's held body pose and limbs remain fully living and undisturbed by the change. Phase 3 - Peak state: The entire face and head are now smooth gray stone with the dancer's expression frozen exactly as it was the instant before conversion, while the body below the neck remains completely living, muscles still faintly tensed in the extended pose, creating a stark contrast between an already-stone face and a still-moving body. Guardrails: Losing the eyes' expressiveness first is emotionally the most jarring beat in this sequence, so the transition from wet, reflective eye to flat gray stone must be gradual enough to read as transformation rather than the eyes simply \"turning off\" like a light switch. Keep the exact facial expression (the set of the mouth, the tilt of the brow) fully preserved as it converts to stone, since if the expression relaxes or changes during the material shift it looks like a separate animation layered on top rather than the same face turning to stone. The body below the neck must retain full color and any residual muscle tension from the dance pose; a body gone slack while the face is mid-transformation contradicts the top-down mechanic this prompt is built on.", "bestFor": "Performing-arts and dance brand content wanting a haunting, high-emotion freeze-frame narrative.", "premium": true}, {"id": "marble-angel-awakening-from-the-base-upward", "title": "Marble Angel, Awakening from the Base Upward", "text": "Phase 1 - Hold: A marble angel statue with folded wings stands atop a plinth in a cemetery or garden setting, fully rigid white stone from the plinth to the crown of the head, wings carved in fine detail but motionless. Phase 2 - Transformation begins: The awakening begins at the plinth's contact point with the statue's feet, marble there taking on a faint warmth and translucency at the very base of the toes, this warmth climbing steadily up the legs beneath the carved robe, visible as the stone-white robe folds begin to show the subtle suggestion of fabric drape and movement rather than static carved lines. As the wave reaches the waist, the folded wings receive their first change - individual feather ridges along the wing's lower edge softening and gaining a faint off-white, downy texture - while the face and upper torso remain untouched solid marble. Guardrails: Marble's translucency is its defining material trait, so the awakening must show warmth entering as a subtle inner glow beneath the surface before full color arrives, rather than an opaque color swap, or the statue will look painted rather than genuinely warming from stone. Keep the wing feather change strictly confined to the lower edge closest to the already-transformed waist region; feathers at the wing's upper tip changing simultaneously would contradict the single upward-spreading wave this prompt depends on. Do not add any wing flutter or lift in this phase, since actual wing movement should be reserved for a later stage once the whole wing has finished transforming, not while it is only partially converted.", "bestFor": "Memorial, cemetery-art, and spiritual/faith-themed content wanting a gentle, reverent awakening moment.", "premium": true}, {"id": "living-sentinel-petrification-spreading-from-a-wound", "title": "Living Sentinel, Petrification Spreading from a Wound", "text": "Phase 1 - Hold: A person stands in worn protective gear in a dim stone corridor, fully alive, a small graze visible on their forearm, otherwise unremarkable and mobile. Phase 2 - Transformation begins: Unlike the other petrification entries, the origin point here is the small graze on the forearm rather than an extremity or the eyes - gray, granular stone texture begins forming exactly at the wound's edges, spreading outward in an uneven, root-like branching pattern across the surrounding skin rather than a clean radial wave, mimicking how a crack pattern branches unpredictably from a point of structural weakness. As the gray branches lengthen and thicken across the forearm, the person's grip on any held object weakens on that side, fingers stiffening unevenly depending on how much stone has reached each one, while the rest of the body remains fully mobile and alive. Phase 3 - Peak state: The forearm is now roughly half-covered in branching gray stone patterns radiating from the original wound site, some fingers stiff and gray while others remain flesh, the person's expression showing strain and awareness as they grip their own arm with their free hand, the rest of the body completely unaffected. Guardrails: Because this origin is a wound rather than a clean anatomical point, the branching pattern must look organic and vein-like (uneven width, irregular forking, denser near the origin and thinner at the branch tips) rather than a symmetrical or geometric spread, since a tidy pattern contradicts the \"spreading from an injury\" premise. Keep the affected fingers' stiffness proportional to how much visible stone has reached each one individually rather than all fingers locking uniformly, since uniform stiffening across partially-affected digits looks inconsistent with the visible texture. The person's reaction (gripping the arm, visible strain) is essential narrative information and must be present; an unreacting subject during a wound-based petrification undercuts the implied urgency and pain the scenario suggests.", "bestFor": "Cinematic trailer and fantasy/adventure game content wanting a tense \"cursed wound\" story beat.", "premium": true}]},
    {"id": "giant-scale-transformation", "num": 34, "name": "Giant Scale Transformation", "shortName": "Giant Scale", "group": "premium", "icon": "fa-maximize", "hue": 18, "desc": "Subjects grow towering or shrink tiny.", "intro": "Scale transformation prompts where people, products, or buildings grow or shrink with environment adjusting believably.", "promptCount": 8, "premium": true, "prompts": [{"id": "the-towering-commuter", "title": "The Towering Commuter", "text": "Phase 1 - Hold: A person stands at a normal human height on a city sidewalk at street level, surrounded by parked cars, streetlights, and pedestrians passing at ordinary scale, the framing wide enough to establish the full urban environment around them. Phase 2 - Transformation begins: The person's body begins expanding uniformly from the ground up, feet planted as the growth anchors there, shoulders and head rising past the second-story windows within a few seconds; the camera tilts and pulls back at a matching rate to keep the whole figure in frame, and nearby objects - cars, lamp posts, awnings - are shown being passed and dwarfed in real time rather than cutting away, their scale acting as a constant ruler against the growing body. Phase 3 - Peak state: The person now towers above the rooftops, buildings reaching only to about knee height, streets below reduced to thin ribbons with toy-sized traffic, the person settling into a steady standing pose as ambient dust and small debris drift near their feet to sell the displaced-air scale of the moment. Guardrails: Keep growth strictly vertical and uniform from a fixed ground anchor point - no limb, head, or torso should distort or grow at a different rate than the rest of the body, and facial identity and proportions must remain consistent at every size. The environment's scale reference objects (cars, buildings, people) must shrink in apparent size relative to the subject smoothly and continuously, never jumping or resetting between phases, and shadows/lighting direction must stay consistent with the original scene throughout.", "bestFor": "Larger-than-life brand mascots, monument-style reveals, and playful \"giant among us\" social content.", "premium": true}, {"id": "the-shrinking-executive", "title": "The Shrinking Executive", "text": "Phase 1 - Hold: A businessperson stands confidently in the middle of an ordinary office conference room, full-height against a table, chairs, and windows at normal scale, framed in a static medium shot that establishes the room clearly. Phase 2 - Transformation begins: The figure starts shrinking smoothly from a fixed floor-contact point, the office table's edge, chair legs, and floor tiles growing relatively larger in frame as the person's height drops in even increments; the camera slowly lowers and pushes closer to the floor to match the shrinking eye-line, keeping the horizon and vanishing point consistent with true perspective at each size. Phase 3 - Peak state: The person is now insect-scaled, standing on the carpet between towering table legs that resemble building columns, dust motes as large as boulders drifting past, a single dropped pen lying nearby like a fallen log, the framing a low-angle close shot that sells the new microscale world. Guardrails: Maintain a single consistent floor-contact anchor throughout the shrink so the subject never appears to float or reposition mid-transformation, and avoid the common failure of the room's textures (carpet fibers, wood grain) staying photorealistically fine-grained at a scale where they should now read as coarse and oversized. Keep the person's proportions and facial identity intact - no melting or warping - through every stage of size reduction.", "bestFor": "Corporate-with-a-twist campaigns, \"small in the big picture\" metaphor videos, and product miniaturization teasers.", "premium": true}, {"id": "sneaker-colossus", "title": "Sneaker Colossus", "text": "Phase 1 - Hold: A single sneaker sits on a clean studio pedestal at normal product-shot scale, softly lit with a slow orbiting hero light, the background a plain seamless backdrop establishing true scale via a nearby ruler prop or human hand for reference. Phase 2 - Transformation begins: The sneaker begins expanding from its center of mass on the pedestal, stitching and fabric textures becoming visibly coarser and more magnified as the shoe grows, the pedestal itself cracking and then being swallowed from view as the shoe's growing footprint exceeds it; the camera pulls back and rises in a continuous arc to keep the entire shoe in frame as it breaches through the studio ceiling into an exterior establishing shot. Phase 3 - Peak state: The sneaker now stands as tall as an office tower against a city skyline, its sole resting across several city blocks, tiny cars and pedestrians visible near its base for scale, dramatic upward light rays grazing the tread pattern to emphasize its monumental size. Guardrails: The product's proportions, color, and logo placement must remain geometrically accurate and undistorted at every scale - this is a product shot, so brand-shape fidelity matters more than in other giant-scale prompts. Ensure the transition from studio interior to exterior skyline reads as one continuous environment breach rather than an abrupt scene cut, and keep the light direction and shadow length physically consistent with the new giant scale.", "bestFor": "Sneaker and footwear brand hero content, oversized product reveal ads.", "premium": true}, {"id": "the-miniaturized-product-on-a-desk", "title": "The Miniaturized Product on a Desk", "text": "Phase 1 - Hold: A perfume bottle stands at normal retail size on a wooden desk beside a laptop and coffee mug, establishing familiar scale references in a clean tabletop still-life composition. Phase 2 - Transformation begins: The bottle shrinks steadily from its base upward, the desk grain and coffee mug now appearing to loom larger in frame at a matched rate, the camera slowly descending to near tabletop height to track the bottle's new eye-line; light reflections on the glass compress and intensify as the object becomes small enough that surface tension and dust become visible physical elements around it. Phase 3 - Peak state: The bottle is now the size of a grain of rice resting in the grooves of the wood grain, a single dust mote nearby looming like a boulder, the coffee mug now visible only as a curved brown wall at the frame's edge, macro-lens shallow depth of field emphasizing the extreme miniature scale. Guardrails: The bottle's label text and cap geometry should scale down proportionally without becoming illegible smudges too early - keep it crisply defined until deep into Phase 3. Avoid the desk surface flattening into a texture-less plane; wood grain, dust, and fiber detail should visibly increase in apparent scale as the product shrinks, reinforcing the size change rather than the background staying static.", "bestFor": "Perfume, cosmetics, and luxury product ads emphasizing scale-based visual intrigue.", "premium": true}, {"id": "the-growing-housecat", "title": "The Growing Housecat", "text": "Phase 1 - Hold: An ordinary housecat sits calmly on a living room rug, a couch and coffee table at normal scale around it, framed in a warm, softly lit domestic wide shot. Phase 2 - Transformation begins: The cat's body begins expanding evenly from its haunches where it sits, fur texture becoming more richly detailed and individually visible as the animal's mass increases, the couch beside it groaning and tilting slightly under a paw that has grown too large to rest gently; the camera cranes upward and backward continuously to keep the whole animal framed as it grows past the ceiling, which is shown cracking open to reveal the sky. Phase 3 - Peak state: The cat now sits contentedly in the middle of a suburban street, houses reaching only to about its shoulder, its tail curled around an entire parked car, its expression calm and unbothered, establishing the giant scale as whimsical rather than threatening. Guardrails: Keep the cat's anatomy proportionally correct at every stage - a common failure is limbs or the head growing faster than the torso, producing a distorted creature rather than a scaled-up version of the same animal. The ceiling and building destruction should be shown as a consequence of the growth in the correct sequence (contact and pressure before breakage), not happen instantaneously or before the cat's body has actually reached that size.", "bestFor": "Pet brand content, whimsical viral animal videos, family-friendly giant-creature shorts.", "premium": true}, {"id": "the-shrinking-skyscraper", "title": "The Shrinking Skyscraper", "text": "Phase 1 - Hold: A city skyline is shown at golden hour from a wide establishing aerial angle, one prominent skyscraper at the center of frame at its normal towering height among neighboring buildings. Phase 2 - Transformation begins: The central skyscraper begins compressing downward from its rooftop, floors visibly telescoping into one another in even, mechanical-looking increments while its footprint and base remain fixed to the ground plane; the camera slowly descends and pushes in as the building shrinks, keeping it centered as neighboring buildings appear to grow relatively taller around it. Phase 3 - Peak state: The once-towering skyscraper is now a small model-sized structure barely reaching the knees of the surrounding buildings, streetlights nearby looming over it like giant poles, city traffic shown passing directly beside it at a scale where cars now appear larger than the building's windows, framed in a slightly low, intimate angle that emphasizes its new smallness. Guardrails: The building's architectural details (windows, ledges, signage) must compress proportionally rather than simply becoming a blurry or flattened texture - floor count and window grid spacing should visibly reduce in a physically sensible way. Keep the ground-level footprint fixed in place throughout so the building doesn't appear to slide or reposition on the skyline as it shrinks.", "bestFor": "Urban planning visualizations, architecture brand storytelling, \"downsizing\" metaphor campaigns.", "premium": true}, {"id": "the-giant-chef", "title": "The Giant Chef", "text": "Phase 1 - Hold: A chef stands at normal height in a professional kitchen, chopping vegetables at a stainless steel counter, pots and pans hanging at ordinary scale in the background, framed in a bright, detailed medium shot. Phase 2 - Transformation begins: The chef begins growing from the soles of their shoes on the kitchen floor, their head and shoulders rising past the overhead pot rack within seconds, hands and knife appearing to scale up in exact proportion to the rest of the body so the chopping motion never looks oversized relative to the arm; the camera pulls back and widens its field of view continuously, the kitchen ceiling and walls shown buckling outward to accommodate the growing figure. Phase 3 - Peak state: The chef now towers over an entire farm-to-table outdoor set piece, using a felled tree trunk as a cutting board and a silo as a mixing bowl, ingredients scaled to match (a watermelon the size of a beach ball becomes bite-sized in the giant hand), framed in a wide dramatic hero shot. Guardrails: Hand-to-object scale relationships must update in lockstep - a very common failure is the knife or ingredients staying at their original real-world size while the chef grows, breaking the illusion instantly. Facial expression and identity should remain warm and recognizable at giant scale, and kitchen structural collapse should be shown as a gradual, load-bearing consequence rather than a sudden unmotivated cut to rubble.", "bestFor": "Food and restaurant brand campaigns wanting a larger-than-life, playful hero moment.", "premium": true}, {"id": "the-tiny-traveler-on-a-map", "title": "The Tiny Traveler on a Map", "text": "Phase 1 - Hold: A traveler stands at normal height on a hiking trail, backpack on, mountains in the distance, framed in a natural outdoor wide shot establishing realistic human scale against the landscape. Phase 2 - Transformation begins: The traveler shrinks steadily while remaining anchored to the same point on the trail, pebbles and blades of grass around their feet appearing to scale up in tandem, their backpack and clothing shrinking in exact proportion so no gear appears mismatched to body size; the camera lowers gradually to track alongside at the traveler's new eye-line, blades of grass beginning to tower like trees by the end of the movement. Phase 3 - Peak state: The traveler is now the size of a beetle, walking between blades of grass that arch overhead like a forest canopy, a nearby dewdrop reflecting the sky like a small lake, the framing an intimate macro-scale shot emphasizing the wonder of the miniature world. Guardrails: Backpack, clothing, and hiking gear must shrink in exact lockstep with the body - no strap or buckle should remain at its original size and appear to float free of the now-smaller figure. Depth of field should shift to macro-photography characteristics (very shallow focus, magnified surface texture on grass and dew) progressively through Phase 2 rather than snapping abruptly in Phase 3.", "bestFor": "Outdoor/adventure brand storytelling, whimsical nature-wonder short-form content.", "premium": true}]},
    {"id": "artistic-style-transformation", "num": 35, "name": "Artistic Style Transformation", "shortName": "Art Style", "group": "premium", "icon": "fa-palette", "hue": 12, "desc": "Photos shift into painterly or illustrated looks.", "intro": "Style transformation prompts - watercolor, comic-ink, claymation, and soft painterly animation aesthetics.", "promptCount": 9, "premium": true, "prompts": [{"id": "portrait-to-soft-painterly-animation", "title": "Portrait to Soft Painterly Animation", "text": "Phase 1 - Hold: A realistic close-up portrait of a person is held still, natural photographic lighting and skin texture fully intact, the pose calm with a slight, natural head tilt establishing the exact likeness to be preserved. Phase 2 - Transformation begins: Soft visible brushstroke texture begins emerging first at the edges of the frame and in the background, spreading inward toward the face last, skin gradually simplifying into smooth gradient blocks of color while individual strands of hair merge into flowing painted clumps; edge lines around the eyes, nose, and mouth soften and thicken slightly into a hand-drawn quality while the underlying facial geometry and proportions stay locked to the original photo. Phase 3 - Peak state: The portrait is now fully rendered in a soft painterly animation aesthetic, warm diffused lighting, visible brush texture across skin and clothing, the person's exact likeness, expression, and pose still clearly recognizable as the same individual from Phase 1, framed identically to the original composition. Guardrails: The identity, facial proportions, and expression must remain clearly recognizable as the same person throughout - the stylization should change surface rendering, not bone structure or features. Ensure the brushstroke texture spreads evenly and completes uniformly across the whole frame rather than leaving a patchwork of photographic and painted regions coexisting in the final state.", "bestFor": "Personal branding intros, animated memoir/storytelling content, and profile-picture-to-avatar reveal videos.", "premium": true}, {"id": "landscape-to-bold-comic-ink-style", "title": "Landscape to Bold Comic-Ink Style", "text": "Phase 1 - Hold: A realistic wide landscape photo of a coastal cliffside at sunset is held, natural color grading and soft atmospheric haze establishing the scene's mood and composition. Phase 2 - Transformation begins: Bold black ink outlines begin tracing themselves along the major silhouettes first - the cliff edge, horizon line, and cloud shapes - appearing as if drawn progressively from one edge of the frame to the other, while flat, high-contrast color fills follow just behind the linework, replacing the photographic gradient sky with graphic bands of color and dramatic cross-hatched shading in the shadow areas. Phase 3 - Peak state: The full scene now reads as a bold comic-ink illustration, thick confident outlines defining every major shape, flat saturated color fills, dramatic ink shading in the cliffs' shadowed undersides, the composition and camera framing identical to the original photograph. Guardrails: The ink linework must trace the actual contours of the original photo's shapes accurately rather than inventing new silhouettes, keeping the landscape's real geography recognizable. Avoid inconsistent line weight across the frame - outlines should maintain a uniform bold thickness throughout rather than thick in some areas and thin or broken in others.", "bestFor": "Travel brand storytelling, poster-style destination reveals, and graphic-novel-inspired scenic content.", "premium": true}, {"id": "product-shot-to-claymation-textured-style", "title": "Product Shot to Claymation-Textured Style", "text": "Phase 1 - Hold: A realistic studio product photo of a ceramic coffee mug is held on a clean seamless backdrop, crisp photographic lighting and reflective highlights establishing its true material and form. Phase 2 - Transformation begins: The mug's surface begins developing a subtle handmade unevenness, faint fingerprint-like ridges and soft rounded imperfections appearing across its form as if reshaped by hand, the once-sharp reflective highlights softening into matte, slightly waxy specular points; the backdrop simultaneously gains a soft fabric-like grain and the shadow beneath the mug thickens and softens to match a tabletop stop-motion set look. Phase 3 - Peak state: The mug now fully reads as a stop-motion-clay-like object, its surface entirely matte with gentle handmade texture and soft rounded edges, warm even studio lighting typical of a miniature tabletop set, the object's exact shape, proportions, and color scheme still clearly the same product as the opening frame. Guardrails: The product's silhouette, proportions, and branding must remain geometrically accurate throughout the transformation since this is a product shot - the clay-like texture should be a surface treatment only, never distorting the mug's actual form or handle shape. Keep the added surface imperfections subtle and evenly distributed rather than overly lumpy or concentrated in one area, which would break the premium product feel.", "bestFor": "Homeware and lifestyle brand ads wanting a warm, handmade, tactile feel.", "premium": true}, {"id": "portrait-to-watercolor-style", "title": "Portrait to Watercolor Style", "text": "Phase 1 - Hold: A realistic outdoor portrait of a person laughing mid-motion is held, natural daylight and crisp photographic detail establishing the candid moment and exact pose. Phase 2 - Transformation begins: Pigment blooms begin softly at the edges of the clothing and background first, colors bleeding gently outward with visible paper-grain texture emerging beneath them, moving inward toward the face and hands last; hard photographic edges soften into loose, slightly imprecise watercolor boundaries while faint dry-brush texture appears across hair strands, the underlying pose and proportions never shifting from the original photograph. Phase 3 - Peak state: The portrait is now a fully realized ink-and-watercolor illustration, soft color bleeds and visible paper texture throughout, loose expressive edges around the hair and clothing, the person's laughing expression and exact pose still unmistakably the same as the opening photograph. Guardrails: The face must retain enough defined structure to stay recognizable even as edges soften - a common failure is over-blurring the watercolor bleed until the likeness dissolves entirely. Keep the pigment bloom progression directional and consistent (outside-in) rather than appearing randomly across the frame in a way that looks glitchy rather than painterly.", "bestFor": "Emotional, candid-moment social content and greeting-card-style animated portraits.", "premium": true}, {"id": "product-shot-to-bold-comic-ink-style", "title": "Product Shot to Bold Comic-Ink Style", "text": "Phase 1 - Hold: A realistic studio photo of a running shoe is held at a three-quarter angle on a plain backdrop, crisp lighting defining its stitching, material texture, and true proportions. Phase 2 - Transformation begins: Bold black contour lines begin drawing themselves along the shoe's silhouette and major structural seams, starting at the sole and moving upward, while flat graphic color fills replace the photographic shading panel by panel; small motion-line accents and a graphic halftone shadow begin forming beneath the shoe to suggest dynamic energy typical of illustrated sports art. Phase 3 - Peak state: The shoe now reads as a bold comic-ink illustration, confident black outlines defining every seam and panel, flat saturated color blocks, a graphic halftone shadow anchoring it to the ground, its exact silhouette and proportions still matching the original product photograph precisely. Guardrails: Because this is a product shot, the shoe's true silhouette, proportions, and panel layout must be preserved exactly under the new linework - outlines should trace real seams, not invent new ones. Ensure the flat color fills apply evenly across each panel without patchy transitional zones where photographic shading lingers alongside flat color.", "bestFor": "Sportswear and sneaker brand campaigns wanting a high-energy, graphic-novel hero look.", "premium": true}, {"id": "landscape-to-soft-painterly-animation-style", "title": "Landscape to Soft Painterly Animation Style", "text": "Phase 1 - Hold: A realistic photo of a quiet forest path in early morning fog is held, natural muted color grading and photographic depth of field establishing the tranquil scene. Phase 2 - Transformation begins: Soft visible brushstrokes begin forming in the fog and treetops first, edges softening and colors simplifying into warm harmonious tones, individual leaves merging into painted clusters of foliage while the fog itself becomes a luminous painted haze with visible directional brush texture; the path and foreground ground detail transition last, maintaining spatial depth and composition throughout. Phase 3 - Peak state: The forest path now reads as a fully painterly animated scene, warm diffused lighting, soft visible brushwork throughout the foliage and fog, the same composition, path direction, and depth of field arrangement as the original photograph, evoking a gentle storybook quality. Guardrails: Maintain the same light source direction and depth arrangement from the original photo throughout the stylization so the scene doesn't appear to shift time of day or spatial layout. Avoid an uneven stylization where the foreground path remains crisply photographic while the background is fully painted, which breaks the sense of one unified world.", "bestFor": "Meditation and wellness brand content, storybook-style nature intros.", "premium": true}, {"id": "portrait-to-bold-comic-ink-style", "title": "Portrait to Bold Comic-Ink Style", "text": "Phase 1 - Hold: A realistic three-quarter portrait of a person in a leather jacket is held under dramatic side lighting, sharp photographic detail establishing strong shadow contrast across the face. Phase 2 - Transformation begins: Bold ink contour lines begin tracing the jawline, collar, and jacket folds first, appearing to draw across the frame in a single confident sweep, while the dramatic shadow side of the face resolves into solid black ink shapes and the lit side flattens into a single warm skin-tone fill; cross-hatched texture appears briefly in the transitional gray areas before settling into pure contrast. Phase 3 - Peak state: The portrait now reads as a bold comic-ink illustration with stark graphic contrast, thick confident line work defining every feature, the person's exact facial structure, expression, and pose still clearly recognizable beneath the graphic treatment. Guardrails: The dramatic light-to-shadow split must resolve into ink shapes that still describe the real facial structure underneath - a common failure is the black shadow shapes becoming abstract blobs disconnected from actual anatomy. Preserve identity by keeping eye shape, nose bridge, and jawline proportions locked to the original photo even as shading simplifies to flat ink fills.", "bestFor": "Edgy character-driven brand content, music and entertainment promo teasers.", "premium": true}, {"id": "product-shot-to-watercolor-style", "title": "Product Shot to Watercolor Style", "text": "Phase 1 - Hold: A realistic photo of a perfume bottle is held on a marble surface with soft natural window light, crisp reflections and true glass transparency establishing its premium material quality. Phase 2 - Transformation begins: Watercolor pigment bleeds begin softly around the marble surface and background first, visible paper grain emerging beneath diffused color washes, then moving onto the bottle itself where the sharp glass reflections soften into loose translucent washes of color that still hint at the bottle's transparency and highlight placement; the label text softens slightly in edge sharpness while remaining legible. Phase 3 - Peak state: The bottle now reads as a soft ink-and-watercolor illustration, gentle pigment bleeds and visible paper texture throughout, loose but accurate rendering of the bottle's silhouette and cap, the label and proportions still clearly identifiable as the same product. Guardrails: Because brand recognition matters here, the bottle's silhouette, cap shape, and label placement must remain identifiable even as edges loosen into watercolor bleed - avoid over-dissolving the label text into illegible texture. Keep the transparency cue (soft color shift where light passes through glass) consistent with the original photo's highlight positions so the material still reads as glass rather than opaque ceramic.", "bestFor": "Luxury fragrance and cosmetics campaigns wanting an elegant, artisanal reveal.", "premium": true}, {"id": "portrait-to-claymation-textured-style", "title": "Portrait to Claymation-Textured Style", "text": "Phase 1 - Hold: A realistic head-and-shoulders portrait of a person smiling directly at camera is held under even studio lighting, crisp photographic skin detail and hair texture establishing the exact likeness. Phase 2 - Transformation begins: The skin surface begins softening into a matte, slightly uneven handmade texture, subtle fingerprint-like ridges forming along the cheeks and forehead, hair simplifying into smooth rounded clumps with a soft sculpted quality, while the eyes remain the sharpest, most detailed feature to anchor identity as everything else around them stylizes; studio lighting shifts to a warmer, softer tabletop-set quality with a slightly thicker contact shadow beneath the chin. Phase 3 - Peak state: The portrait now fully reads as a stop-motion-clay-like character, matte handmade skin texture, smooth sculpted hair, warm even lighting typical of a miniature set, the person's expression, likeness, and pose still unmistakably recognizable as the same individual from the opening frame. Guardrails: Keep the eyes and overall facial proportions sharply anchored to the original likeness even as skin texture becomes deliberately imperfect - over-applying the handmade texture to the eyes specifically will break recognizability fastest. Ensure the clay-like surface imperfections are applied evenly across the whole face and neck rather than appearing only in patches, which would look like a rendering glitch rather than a deliberate style.", "bestFor": "Playful family-friendly brand mascots and warm, nostalgic character intros.", "premium": true}]},
    {"id": "bullet-time-freeze-orbit", "num": 36, "name": "Bullet-Time Freeze Orbit", "shortName": "Bullet Time", "group": "premium", "icon": "fa-bullseye", "hue": 6, "desc": "Motion freezes while the camera orbits.", "intro": "Matrix-style bullet-time where action freezes at peak moment and the camera circles the subject.", "promptCount": 8, "premium": true, "prompts": [{"id": "the-frozen-mid-air-jump", "title": "The Frozen Mid-Air Jump", "text": "Phase 1 - Hold: An athlete is captured mid-sprint approaching a jump, real-time motion, natural momentum and motion blur on the trailing leg, the camera at a static low angle establishing the action's normal speed and energy. Phase 2 - Transformation begins: At the peak of the jump, with the athlete's body fully airborne and limbs extended, motion halts completely - no muscle jitter, no fabric sway, no drifting dust - while the camera simultaneously begins swinging in a wide horizontal arc around the suspended figure, sweeping roughly 180 degrees from one side of the body to the other at a smooth, constant angular speed, revealing the frozen pose from multiple angles as it travels. Guardrails: Every frozen element - hair, clothing, sweat droplets, dust in the air - must remain perfectly locked in place for the entire orbit with zero drift, since even slight secondary motion during the \"freeze\" breaks the illusion immediately. The orbit's radius and height relative to the subject must stay constant throughout the arc, avoiding any wobble, speed change, or sudden radius jump that would read as a camera error rather than a deliberate move.", "bestFor": "Sports and action brand hero shots, dramatic highlight-reel climaxes.", "premium": true}, {"id": "the-frozen-product-reveal", "title": "The Frozen Product Reveal", "text": "Phase 1 - Hold: A sealed product box sits closed on a pedestal in a dark studio, a single dramatic spotlight above it, the camera static and centered establishing anticipation before the reveal. Phase 2 - Transformation begins: The box lid bursts open and the product inside is captured mid-launch, suspended in the air with light catching its surface and a few small confetti particles frozen mid-flight around it; the instant this peak is reached, all motion stops completely and the camera begins a full 360-degree orbit around the suspended product at a slow, deliberate, constant speed, lighting appearing to subtly re-angle relative to the moving camera to keep the product looking dimensional from every side. Guardrails: Confetti and particle positions must stay perfectly fixed relative to the product throughout the entire 360-degree orbit - any particle that appears to shift position between the start and end of the orbit breaks the freeze illusion. Reflections and highlights on the product's surface should update believably as the camera angle changes around it, since a product that looks lit identically from every angle will read as flat and fake rather than a real frozen 3D object in space.", "bestFor": "Product launch teasers, unboxing hero moments, e-commerce hero video ads.", "premium": true}, {"id": "the-frozen-dramatic-pose", "title": "The Frozen Dramatic Pose", "text": "Phase 1 - Hold: A performer stands center stage under moving spotlight beams, caught mid-performance in natural continuous motion, the camera handheld and dynamic to establish live-performance energy. Phase 2 - Transformation begins: At the peak of a dramatic pose - arms flung wide, cape or fabric caught fully extended in the air, expression at its most intense - everything halts at once, including the fabric which holds its exact extended silhouette against gravity; the camera then begins a partial 120-degree arc around the performer, moving at a smooth constant speed low to high, rising slightly as it travels to reveal the pose from a more heroic upward angle by the arc's end. Guardrails: Extended fabric, hair, and any caught-mid-air elements must hold their exact frozen shape with no sagging or settling during the orbit, since gravity resuming even slightly on one element while the rest stays locked is the fastest way to break the illusion. Keep the moving spotlight beams from the establishing phase either fully frozen in place too or logically absent during the freeze, rather than continuing to sweep independently of the frozen performer, which would create a jarring inconsistency.", "bestFor": "Concert and performance promo content, dramatic character reveal trailers.", "premium": true}, {"id": "the-frozen-splash-impact", "title": "The Frozen Splash Impact", "text": "Phase 1 - Hold: A diver is shown mid-fall just before hitting a pool's surface, natural falling motion and ripple-free still water below, the camera at water level establishing the calm before impact. Phase 2 - Transformation begins: At the exact instant of impact, water erupts upward in a crown-shaped splash around the diver's entry point, droplets suspended mid-air at their most dramatic extension; motion freezes completely at this peak and the camera begins a full 360-degree orbit around the frozen splash and diver, moving at a steady, unhurried speed just above the waterline so both the airborne droplets and the diver's submerging form stay in frame throughout. Guardrails: Every suspended water droplet must maintain its exact frozen position and shape throughout the full orbit with no evaporation, merging, or drift, since water elements are especially prone to subtly \"settling\" during long camera moves. Light refraction and highlights within the droplets and splash crown should shift realistically as the camera circles around them, keeping the water looking dimensional and physically lit rather than like a flat pasted-in effect.", "bestFor": "Sports drink and swimwear brand hero shots, high-impact action-sequence climaxes.", "premium": true}, {"id": "the-frozen-car-drift", "title": "The Frozen Car Drift", "text": "Phase 1 - Hold: A car is shown mid-drift around a corner on a wet track, tire smoke beginning to build and natural motion blur on the spinning wheels, the camera tracking alongside at speed to establish the action. Phase 2 - Transformation begins: At the peak of the drift angle, with the car fully sideways and tire smoke billowing at its thickest, all motion halts instantly - smoke plumes hold their exact suspended shape, water droplets kicked up from the wet track freeze mid-arc; the camera then sweeps through a 270-degree arc around the frozen car at a smooth, constant speed, dipping slightly lower as it passes the rear to emphasize the tire smoke's density before rising again toward the front. Guardrails: Tire smoke must hold its exact frozen volume and shape throughout the orbit without dissipating, thinning, or drifting in a new direction, since smoke is a common failure point for subtly \"continuing\" to billow even when everything else is frozen. Keep the track's wet-surface reflections consistent with a single frozen moment in time as the camera moves around the car, avoiding reflections that appear to update as if time were still passing.", "bestFor": "Automotive brand hero campaigns, motorsport highlight content.", "premium": true}, {"id": "the-frozen-fight-stance", "title": "The Frozen Fight Stance", "text": "Phase 1 - Hold: Two fighters are shown mid-exchange in a dimly lit arena, natural continuous motion and sweat catching the overhead lights, the camera at a dynamic mid-height angle establishing the fight's intensity. Phase 2 - Transformation begins: At the exact moment one fighter's strike connects, both bodies freeze completely - the impact's shockwave shown as a suspended ripple across the struck fighter's cheek and a frozen spray of sweat droplets catching the light; the camera begins a full 360-degree orbit around the two frozen figures at a slow, weighty speed, passing directly between them at the midpoint of the circle to briefly frame the exact point of contact in close-up before continuing around. Guardrails: The suspended sweat droplets and skin-ripple shockwave must stay perfectly locked in position and shape for the entire 360-degree pass, including the close moment when the camera passes directly between the two fighters, where any inconsistency will be most visible. Both fighters' balance and center of gravity must look physically plausible as a frozen instant (weight correctly distributed for that exact stance) rather than looking like a floating, unanchored pose.", "bestFor": "Combat sports promo trailers, action-movie-style dramatic climaxes.", "premium": true}, {"id": "the-frozen-confetti-celebration", "title": "The Frozen Confetti Celebration", "text": "Phase 1 - Hold: A crowd is shown celebrating in real time at an award ceremony, confetti cannons just beginning to fire, natural motion and cheering establishing the live energy of the moment. Phase 2 - Transformation begins: At the peak density of the confetti fill, with the central honoree mid-cheer, arms raised, everything freezes at once, confetti pieces suspended at every depth of the frame; the camera begins a partial 150-degree arc rising from a low angle up and over the honoree, moving at a smooth constant speed that treats the confetti field as a three-dimensional volume to move through rather than a flat backdrop, individual pieces passing near and far from the lens at different points along the arc. Guardrails: Confetti pieces at different depths must maintain correct relative parallax as the camera moves through the arc - near pieces should appear to shift position against far pieces exactly as real depth would dictate, otherwise the frozen field will look like a flat painted layer. Keep the honoree's raised-arm pose and expression anatomically consistent and unwavering throughout the arc, since the subject is the emotional anchor of the shot and any drift there undermines the whole effect.", "bestFor": "Award show highlight reels, celebratory brand and sports-victory content.", "premium": true}, {"id": "the-frozen-shattering-glass", "title": "The Frozen Shattering Glass", "text": "Phase 1 - Hold: A glass object is shown at the instant of impact from an unseen force, the first visible crack lines just beginning to spider across its surface, the camera static and close to establish the object clearly before destruction. Phase 2 - Transformation begins: The glass shatters outward into hundreds of fragments, each piece captured at its most dramatically separated point mid-explosion, light catching the fractured edges; motion freezes completely at this peak and the camera performs a full 360-degree orbit around the suspended fragment cloud at a slow, deliberate speed, passing through varying heights (dipping low, then rising above) to reveal the three-dimensional structure of the frozen explosion from multiple vantage points. Guardrails: Every glass fragment must hold its exact frozen position, rotation, and trajectory angle throughout the full orbit with zero drift, since a field of hundreds of small objects is especially prone to subtle unintended movement that reads as the freeze \"leaking.\" Light refraction and specular glints on each fragment should update convincingly as the camera angle changes, keeping the fragments looking like real dimensional glass catching light rather than static flat cutouts pasted into the frame.", "bestFor": "Dramatic destruction-reveal content, luxury or tech product \"breaking the mold\" concept ads.", "premium": true}]},
    {"id": "earth-zoom-pullback", "num": 37, "name": "Earth Zoom Pullback", "shortName": "Earth Zoom", "group": "premium", "icon": "fa-earth-americas", "hue": 72, "desc": "Camera pulls back from close-up to orbit.", "intro": "Epic scale-jump zooms - from an iris or product detail all the way out to a planetary view.", "promptCount": 9, "premium": true, "prompts": [{"id": "iris-to-orbit", "title": "Iris to Orbit", "text": "Phase 1 - Hold: Extreme macro close-up on a single human eye, the iris filling the frame, a faint catchlight sitting steady on the cornea, lashes slightly trembling with a slow blink-hold. Phase 2 - Transformation begins: The camera begins pulling back smoothly and without cutting, the eye shrinking to reveal the face, then the head and shoulders, then the whole seated body in a room, the pull-back speed increasing geometrically so each doubling of distance takes half the time of the last. As the pace accelerates the room dissolves into a building exterior, the building into a block, the block into a city grid seen from a low aerial angle, all rendered as one unbroken outward trajectory rather than discrete jumps. Phase 3 - Peak state: The pull-back continues past the city into a curved-horizon aerial view and settles on a high-altitude satellite-style framing of the region, the camera motion easing to a stop as haze and cloud layers fade the ground detail into soft abstraction. Guardrails: Keep the eye and face perfectly identity-consistent through the first two scale transitions since this is the segment viewers scrutinize most; do not let the acceleration curve look like a hard cut between room and building - blend through a brief soft-focus frame if needed to hide the scale jump. Avoid impossible lighting flips (daylight face indoors, then suddenly night city) and do not let the person's pose or the room's layout warp as it shrinks.", "bestFor": "Cinematic intros for personal branding films, documentary-style openers, or dramatic reveal ads.", "premium": true}, {"id": "product-on-the-table", "title": "Product on the Table", "text": "Phase 1 - Hold: Tight macro shot of a single product resting on a wooden table, condensation or fine surface texture visible, ambient light holding steady with a soft practical glow just off-frame. Phase 2 - Transformation begins: The camera pulls back at a measured, constant velocity first, revealing the tabletop, then the room the table sits in, then through a window transition the exterior of the building becomes visible as the pull-back speed doubles; from there the retreat accelerates sharply, the building shrinking into a street block, the block into a city skyline, ending in an orbital pull that treats the same rate of acceleration established in Phase 2. Phase 3 - Peak state: The final frame settles on a wide daytime satellite view of the metro area with the original street identifiable only as a faint grid line, the motion decelerating to a soft stop rather than an abrupt freeze. Guardrails: Ensure the product's proportions and label details stay locked and undistorted through the tabletop-to-room transition, since product identity is the commercial payload of this shot. Avoid the room-to-exterior cut reading as a jump-cut - carry a consistent light source direction through the window transition, and do not let the building's architecture change between the interior-implied structure and the exterior reveal.", "bestFor": "Product launch reveals and premium e-commerce hero videos.", "premium": true}, {"id": "doorway-of-the-house", "title": "Doorway of the House", "text": "Phase 1 - Hold: Close-up on a house's front door, brass handle and door texture in sharp focus, a porch light holding a steady warm glow, a faint breeze moving a nearby plant. Phase 2 - Transformation begins: The camera retreats in three distinct staged jumps rather than one smooth continuum: first a quick pull-back revealing the full house facade and front yard, holding half a second, then a faster secondary pull-back revealing the entire street and neighboring rooftops, holding briefly again, then a final rapid retreat through cloud layer into a satellite-altitude view. Each stage jump uses a brief motion-blur whip to mask the scale discontinuity. Phase 3 - Peak state: The sequence ends on a static high-altitude view with the neighborhood block faintly outlined, motion blur clearing to crisp stillness as the camera stops. Guardrails: Since this prompt uses deliberate staged jumps rather than continuous pull-back, the motion-blur whip must fully obscure each transition or the cuts will look like an error rather than a stylistic choice - keep each blur long enough to hide geometry changes. Keep the house's architecture, roof color, and yard layout identical across all three reveals so the neighborhood context reads as trustworthy rather than randomly generated.", "bestFor": "Real estate listing openers and neighborhood marketing reels.", "premium": true}, {"id": "city-street-at-ground-level", "title": "City Street at Ground Level", "text": "Phase 1 - Hold: Close-up at street level on a pedestrian's shoes and the pavement texture, a coffee cup steaming faintly nearby, ambient street sound implied by subtle motion in litter or steam. Phase 2 - Transformation begins: The camera pulls back and simultaneously rises, a combined dolly-and-crane retreat that reveals the full pedestrian, then the sidewalk and storefronts, then the street block from a rooftop-height angle, the rise and retreat both accelerating together so the vertical and horizontal scale change feel like one continuous diagonal escape rather than two separate motions. The city block gives way to a wider aerial view of downtown as the acceleration peaks. Phase 3 - Peak state: The shot settles into a high-altitude oblique aerial of the full downtown grid, the acceleration easing off gradually over the final two seconds rather than stopping sharply. Guardrails: The combined rise-and-retreat must keep a single consistent horizon line and sun angle throughout, or the city geometry will appear to twist unnaturally; do not allow the initial pedestrian to remain suspiciously sharp and identical in scale-relative detail once they should be a barely visible dot from rooftop height. Watch for street layouts regenerating inconsistently between the sidewalk view and the aerial view.", "bestFor": "Urban lifestyle brand films and city tourism promos.", "premium": true}, {"id": "hand-holding-a-coin", "title": "Hand Holding a Coin", "text": "Phase 1 - Hold: Extreme close-up on a coin balanced on a fingertip, metallic surface catching a single light source, the hand subtly trembling with held tension. Phase 2 - Transformation begins: The pull-back is continuous and smooth with no staged jumps, moving at a constant logarithmic rate so that each second covers roughly ten times the distance of the previous second: fingertip to hand, hand to full body standing in a plaza, plaza to city block, city block to coastline silhouette, coastline to full continental outline, each transition blending directly into the next with zero holds or pauses. Phase 3 - Peak state: The pull-back terminates on a curved-earth orbital view with the continent's coastline recognizable, camera drift slowing asymptotically until it appears nearly still. Guardrails: Because this variation is a single unbroken continuous pull with no masking cuts, geometry must deform gradually and plausibly at every instant - watch for the plaza, block, and coastline appearing fully formed too early relative to the camera's implied distance. Keep the coin and hand perfectly stable in the first second since any drift there is highly noticeable at extreme macro scale.", "bestFor": "High-concept finance or philosophical brand storytelling ads.", "premium": true}, {"id": "flower-in-the-garden", "title": "Flower in the Garden", "text": "Phase 1 - Hold: Macro shot on a single flower petal with a dewdrop resting on its surface, faint refraction visible inside the droplet, a small insect leg entering frame edge. Phase 2 - Transformation begins: The camera pulls back in two large jumps: first an accelerating retreat that reveals the whole flower, the flowerbed, and the garden, holding briefly on the full garden and house behind it; then a second, much faster retreat that skips directly from garden-scale to a high aerial neighborhood view, using a soft whip-pan blur to bridge the enormous scale gap in under a second. Phase 3 - Peak state: The camera settles on a daytime aerial view of the neighborhood with the garden barely a green speck, holding steady as the blur resolves into sharp focus. Guardrails: The second jump crosses an unusually large scale gap in very little time, so the whip-blur must be long and complete enough that no intermediate scale (like street-level) is glimpsed inconsistently mid-blur. Keep the dewdrop's refraction and petal color consistent with the garden's overall color palette once revealed, so the macro and wide shots feel like the same photographed reality.", "bestFor": "Nature and gardening brand content, wellness product openers.", "premium": true}, {"id": "watch-face-close-up", "title": "Watch Face Close-Up", "text": "Phase 1 - Hold: Tight close-up on a wristwatch face, second hand ticking steadily, faint reflections of the surrounding room visible in the crystal. Phase 2 - Transformation begins: The pull-back begins slowly, almost imperceptibly, for the first full second to establish the wrist and arm, then abruptly accelerates into a rapid continuous retreat through the room, the building exterior, the city, and into orbit, the sudden acceleration change acting as the dramatic pivot of the sequence rather than a hidden seam. Phase 3 - Peak state: The retreat ends on an orbital view of the hemisphere with day-night terminator visible, the motion braking smoothly over the last half-second to a clean stop. Guardrails: The deliberate slow-to-fast acceleration pivot must still read as intentional pacing rather than a stutter or lag artifact - ensure the speed change is smooth on a curve rather than a sudden linear jump. Keep the watch's reflected room details plausible and non-repeating as they shrink out of visible resolution, avoiding any texture that suddenly \"resets\" to a cleaner state.", "bestFor": "Luxury goods advertising and time-themed brand campaigns.", "premium": true}, {"id": "chef-s-knife-on-the-cutting-board", "title": "Chef's Knife on the Cutting Board", "text": "Phase 1 - Hold: Extreme close-up on a knife blade slicing through a single ingredient, juice or steam rising, the motion holding at the midpoint of the cut for emphasis. Phase 2 - Transformation begins: The camera pulls back through four clearly staged jumps, each one twice as fast as the last: cutting board to full kitchen counter, kitchen counter to the whole restaurant interior, restaurant interior to the building exterior on its street, and street to a wide city aerial, each jump using a quick focus-pull blur rather than a hard cut to bridge the scale change. Phase 3 - Peak state: The sequence ends on a city-scale aerial view at dusk with the restaurant's block lit among many others, the final jump's blur clearing to reveal the settled wide shot. Guardrails: With four discrete jumps, consistency of time-of-day and light temperature across each stage is critical - do not let the kitchen appear as daytime and the exterior reveal as nighttime without an intentional and explained passage of time. Keep the ingredient and knife position frozen accurately as the reference point so the eye can track continuity through each blur transition.", "bestFor": "Restaurant and culinary brand storytelling, chef-led promotional content.", "premium": true}, {"id": "astronaut-visor-reflection", "title": "Astronaut Visor Reflection", "text": "Phase 1 - Hold: Close-up on an astronaut's helmet visor, a reflection of a launch pad or planetary surface visible in the curved glass, breath fogging faintly at the visor's edge. Phase 2 - Transformation begins: The pull-back reverses the usual direction of scale logic by starting already at a body-scale shot and continuously retreating outward through the immediate structure, then the full facility or landscape, and finally out past the atmosphere into a planetary orbital view, the retreat speed increasing smoothly the entire time with no discrete stage holds, since the subject is already framed at a larger starting scale than the other prompts in this set. Phase 3 - Peak state: The shot ends on a full-planet view from orbit, the astronaut's location no longer distinguishable, camera drift settling to a slow stable orbit-style glide rather than a hard stop. Guardrails: Because the starting scale is already larger than a macro close-up, the pull-back must still feel escalating and dramatic rather than just a generic zoom-out - bias the acceleration curve so the final two scale transitions (facility to landscape, landscape to orbit) happen noticeably faster than the first. Keep the visor reflection's content logically consistent with whatever environment is revealed once the pull-back exposes it.", "bestFor": "Space, aerospace, and exploration-themed brand or educational content.", "premium": true}]},
    {"id": "elemental-materialization", "num": 38, "name": "Elemental Materialization", "shortName": "Elemental", "group": "premium", "icon": "fa-wind", "hue": 66, "desc": "Subjects form from sand, smoke, water, ice, or petals.", "intro": "Elemental assembly and dissolve prompts - sand figures, smoke faces, water droplets, ice crystals, petal portraits.", "promptCount": 9, "premium": true, "prompts": [{"id": "sand-figure-assembling", "title": "Sand Figure Assembling", "text": "Phase 1 - Hold: A flat, empty stretch of wind-swept dune, fine sand grains skittering low across the surface in the ambient breeze, no form yet visible, camera holding steady at eye level. Phase 2 - Transformation begins: Grains begin lifting from the ground in scattered clusters, first gathering low around where feet would stand, the accumulation building upward gradually - ankles, then legs, then torso - each layer of the body forming from countless individual grains cohering under an implied magnetic pull rather than sliding as a solid sheet. The wind continues to pull loose grains off the surface even as the form solidifies, so assembly and minor erosion happen simultaneously until the upper body and head are the last to lock into shape. Phase 3 - Peak state: The figure stands fully assembled, textured like packed sand with visible individual grain roughness, a final settling shudder passing through the form as the last loose grains click into place and the wind dies down around it. Guardrails: Sand must behave as granular solid particles that fall and pile under gravity, never smearing or flowing like liquid or curling like smoke. Ensure the figure resolves into an anatomically coherent, recognizable human shape rather than a vague humanoid blob, and keep the build order strictly bottom-up so the sequence reads as physically caused rather than randomly assembled.", "bestFor": "Desert-brand campaigns, mystical or origin-story content, music video visuals.", "premium": true}, {"id": "smoke-coalescing-into-a-face", "title": "Smoke Coalescing into a Face", "text": "Phase 1 - Hold: A dim, still room with a single thin ribbon of smoke rising from an unseen source, curling slowly in the ambient air with no form or intent yet visible. Phase 2 - Transformation begins: The smoke ribbon begins folding back on itself, additional wisps drawn in from the edges of frame as though pulled by a gentle current, density building first around where a jawline would sit, then cheekbones and brow, the smoke thickening unevenly and swirling within itself even as the silhouette sharpens. Facial features emerge as areas of relatively denser, slower-moving smoke against the still-drifting looser wisps around the edges of the forming head. Phase 3 - Peak state: A recognizable human face holds within the smoke for a suspended beat, its surface still faintly roiling and shifting at the edges, before the density needed to sustain the shape begins thinning again. Guardrails: Smoke must remain visibly gaseous throughout, with soft roiling edges and never a hard, clean boundary that would suggest a solid object underneath. Do not let the face lock into a perfectly static sculpture-like stillness - the surface should keep low-level turbulence even at peak resolution - and ensure the facial proportions read as a specific, coherent face rather than an ambiguous smoky smudge.", "bestFor": "Perfume and fragrance ads, mystery-themed brand teasers, atmospheric music visuals.", "premium": true}, {"id": "water-droplets-gathering-into-a-figure", "title": "Water Droplets Gathering into a Figure", "text": "Phase 1 - Hold: A dry pedestal or empty patch of air above a reflective floor, scattered individual water droplets suspended mid-air motionless, catching light like small lenses, camera holding on the stillness. Phase 2 - Transformation begins: The droplets begin drifting toward a common center, merging in twos and threes into larger beads as they collide, the growing masses stacking from the ground up into leg shapes, then torso, the water's surface tension visibly straining to hold each new merged section together before the next wave of droplets arrives and adds volume. Rivulets occasionally slide down the already-formed sections as gravity pulls at the accumulating mass, requiring fresh droplets to replenish the surface. Phase 3 - Peak state: A full watery figure stands complete, its surface a continuous skin of rippling liquid holding a humanoid shape, small drips falling from fingertips and chin as the excess water sheds off, the form's outline occasionally rippling as it stabilizes. Guardrails: Water must always show surface tension and reflective sheen, and must drip and shed excess volume under gravity rather than staying magically fixed in an impossible shape. Keep the merging droplets' physics consistent - collisions should combine mass and momentum plausibly - and prevent the final figure from looking like solid glass or plastic; it must read as a fluid, faintly trembling body of liquid.", "bestFor": "Beverage brand ads, spa and wellness content, ocean or environmental campaigns.", "premium": true}, {"id": "ice-crystal-growing-facet-by-facet", "title": "Ice Crystal Growing Facet by Facet", "text": "Phase 1 - Hold: A single tiny ice seed crystal resting on a dark reflective surface in freezing air, faint mist curling around it, camera close and static. Phase 2 - Transformation begins: Thin crystalline spires begin extending outward from the seed in sharp geometric increments, each new facet locking into place at an angle consistent with real ice-crystal lattice structure, the growth radiating outward and upward in visible discrete stages rather than a smooth continuous bloom - a spire extends, then branches, then a connecting plane fills in between branches, repeating in layered waves until a humanoid or object silhouette is fully outlined in faceted ice. Phase 3 - Peak state: The completed crystalline form stands fully faceted and translucent, internal refractions catching the light as a final layer of frost creeps visibly across the outermost surfaces to seal the texture. Guardrails: Growth must proceed in the sharp, angular, faceted manner specific to crystal lattice formation, never as a smooth organic blob or liquid pour; keep each branching stage geometrically plausible rather than random spikes. The final form must resolve into a clearly recognizable silhouette despite the faceted surface breaking up its outline, so avoid over-fracturing the shape into unreadable geometric noise.", "bestFor": "Winter and luxury jewelry campaigns, fantasy-themed content, cold-beverage advertising.", "premium": true}, {"id": "flower-petals-assembling-into-a-portrait", "title": "Flower Petals Assembling into a Portrait", "text": "Phase 1 - Hold: A gentle breeze scattering loose flower petals across an empty garden clearing, petals tumbling and settling without any pattern, camera holding at a low static angle. Phase 2 - Transformation begins: Petals begin lifting off the ground and drifting inward, layering themselves against an invisible surface starting from the outer silhouette edge and working inward, larger petals forming broad shoulder and hair contours first while smaller petals fill in finer facial detail last, each petal settling with a slight flutter before locking flat against the growing form. Overlapping petals shingle naturally like scales, with occasional stray petals still drifting in and finding their place even after the main shape is mostly visible. Phase 3 - Peak state: A complete portrait made entirely of layered petals holds still, a last few stragglers settling into small gaps, the whole surface gently trembling as if still catching the breeze. Guardrails: Petals must shingle and overlap the way real flexible organic material would, never fusing into a smooth solid surface or losing their individual petal silhouettes. Ensure facial or figure proportions remain recognizable even once fully covered in overlapping petal texture, and keep petal color and species visually consistent throughout rather than randomly changing type mid-formation.", "bestFor": "Beauty and cosmetics campaigns, romantic or seasonal brand content, floral industry advertising.", "premium": true}, {"id": "subject-dissolving-into-sand", "title": "Subject Dissolving into Sand", "text": "Phase 1 - Hold: A person standing still in a desert setting, ordinary and fully solid, a light wind moving their clothing, camera holding on a steady medium shot. Phase 2 - Transformation begins: Erosion begins at the extremities - fingertips and hair first - grains peeling away and lifting into the wind, the disintegration spreading inward and upward from the hands and lower legs toward the torso, each departing section leaving a rough granular edge behind rather than a clean cut, the remaining solid mass shrinking steadily as more of the body converts to airborne sand. The wind carries the released grains off in a consistent directional stream rather than scattering randomly in all directions. Phase 3 - Peak state: The last coherent fragment - perhaps the silhouette of the head - crumbles and disperses into the same directional wind stream, leaving only an empty patch of settled sand on the ground where the person once stood. Guardrails: The erosion must progress from a consistent starting point and spread logically rather than have random patches disappear simultaneously across unrelated body regions. Keep the departing sand's wind direction and speed constant throughout so the dispersal reads as one physical event, and avoid the remaining solid portions looking suspiciously smooth or unaffected until the very last frame.", "bestFor": "Desert fashion editorials, transient or mortality-themed art films, dramatic brand transitions.", "premium": true}, {"id": "subject-dissolving-into-smoke", "title": "Subject Dissolving into Smoke", "text": "Phase 1 - Hold: A person standing in soft interior light, fully solid and calm, camera holding on a close medium shot with subtle natural breathing movement. Phase 2 - Transformation begins: The body's edges begin softening first, a faint haze forming at the silhouette's outer boundary before visible wisps start lifting away from the shoulders and head, the solid mass beneath thinning unevenly as more surface area converts to drifting smoke, patches of remaining solid form visible through the thickening haze until only a loose, semi-transparent suggestion of the body remains. Air currents visibly pull the accumulating smoke sideways as it rises, so the dispersal has a clear directional drift rather than floating straight up evenly. Phase 3 - Peak state: The final shape thins into a loose drifting cloud with no solid remnant, the smoke spreading and fading into the ambient air until the frame returns to being simply an empty lit room. Guardrails: The dissolve must show the smoke thinning and losing density gradually rather than the person instantly vanishing behind a smoke curtain; keep some translucent solid detail visible through the haze during the middle phase to sell the conversion. Maintain one consistent air-current direction throughout so the drifting smoke doesn't contradict itself frame to frame.", "bestFor": "Mystery and thriller trailers, perfume or fragrance brand reveals, supernatural-themed content.", "premium": true}, {"id": "subject-forming-from-falling-water", "title": "Subject Forming from Falling Water", "text": "Phase 1 - Hold: An empty spot beneath a soft cascade of falling water droplets in slow motion, each drop catching ambient light as it falls past an empty frame, camera static and low. Phase 2 - Transformation begins: Individual falling droplets begin curving off their straight downward path mid-fall, redirected as though pulled toward a forming shape, accumulating first into a base and legs at the ground before the flow builds upward, additional droplets arriving in a steady rhythmic stream that thickens the form layer by layer from the feet to the chest to the head. Excess water continuously sheets off the sides of the growing form and pools at the base even as new droplets arrive to replace it, keeping the surface constantly active rather than static. Phase 3 - Peak state: A complete watery figure stands formed from the redirected cascade, water still visibly sheeting down its surface and dripping from extremities, the ambient falling water behind it settling into a calmer steady trickle. Guardrails: Droplets must visibly redirect and curve under an implied external pull rather than simply teleporting into position, and the surface should never look static or dry - continuous sheeting and dripping must persist even at peak formation. Keep the accumulation order strictly bottom-to-top so gravity logic stays intact, and avoid the finished figure looking like solid glass rather than active, gravity-affected liquid.", "bestFor": "Luxury water and beverage brand films, spa and wellness openers, ethereal fashion content.", "premium": true}, {"id": "subject-dissolving-into-petals", "title": "Subject Dissolving into Petals", "text": "Phase 1 - Hold: A person standing in a softly lit garden setting, fully solid, a faint breeze moving surrounding foliage, camera holding on a steady medium shot. Phase 2 - Transformation begins: Petals begin peeling away from the silhouette's edges first - the ends of the hair and fingertips lifting free as small flower petals rather than dissolving as particles - the effect spreading inward with entire patches of clothing and skin surface converting into layered petals that immediately catch the wind and drift off in a consistent diagonal direction. The remaining solid form thins in visible sections, some areas fully converted to drifting petals while adjoining areas remain briefly solid, creating a patchwork transitional silhouette before it fully gives way. Phase 3 - Peak state: The last few petals lift from where the head was and drift away with the rest, leaving the clearing empty except for a light scatter of petals settling on the ground and continuing to blow past in the established wind direction. Guardrails: Each departing piece must read distinctly as an individual petal shape rather than generic dissolving particles, preserving the flower-specific material identity throughout. Keep the wind direction and petal drift speed constant from the first departing petal to the last so the dispersal feels like one continuous physical event, and avoid the patchwork transitional silhouette lingering so long that it reads as a rendering glitch rather than an intentional phase.", "bestFor": "Romantic film transitions, beauty and fragrance campaigns, seasonal brand storytelling.", "premium": true}]},
    {"id": "costume-identity-morph", "num": 39, "name": "Costume / Identity Morph", "shortName": "Costume Morph", "group": "premium", "icon": "fa-shirt", "hue": 60, "desc": "Full look transforms via a sweeping wave.", "intro": "Costume and identity morphs - ripple sweeps, spin reveals, and shadow-peel wardrobe transformations.", "promptCount": 9, "premium": true, "prompts": [{"id": "vertical-ripple-sweep-formal-to-casual", "title": "Vertical Ripple Sweep, Formal to Casual", "text": "Phase 1 - Hold: A person stands in sharp formal attire - tailored jacket, pressed collar, polished shoes - under even studio light, holding a relaxed neutral pose, camera locked on a static medium shot. Phase 2 - Transformation begins: A thin band of shimmering distortion appears at the top of the head and begins sweeping straight downward at a slow, even pace, the formal fabric behind the band instantly resolving into casual fabric - the jacket becoming a soft pullover, the collar loosening - while everything below the band remains untouched formal wear until the sweep reaches it. The band maintains a consistent horizontal edge as it travels down through chest, waist, and legs, texture and color resolving fully within the width of the band itself rather than fading in gradually. Phase 3 - Peak state: The band exits past the shoes and dissipates, leaving the person fully restyled in casual wear, the same relaxed pose held throughout, a faint settle of the new fabric as it responds to gravity for the first time. Guardrails: The ripple band must stay perfectly horizontal and continuous with no gaps or misaligned seams where it meets the body's contours at shoulders or hips. The subject's face, hair part, skin tone, and pose must remain completely unchanged throughout - only clothing may be affected - and the fabric physics of the new outfit must engage naturally the instant it is revealed rather than looking pasted on.", "bestFor": "Fashion brand transitions and before/after style reveal content.", "premium": true}, {"id": "color-wave-wash-everyday-to-elaborate", "title": "Color-Wave Wash, Everyday to Elaborate", "text": "Phase 1 - Hold: A person stands in plain, simple everyday clothing in a neutral setting, arms relaxed at their sides, camera holding a static wide shot with soft ambient light. Phase 2 - Transformation begins: A wave of saturated color light washes across the frame from left to right, and wherever the color passes over the body, the plain clothing resolves into progressively more elaborate, richly detailed costume fabric - embroidery, layered textures, ornamentation building up as the wave crosses each section of the body from one shoulder across the chest to the opposite arm. The wave carries a visible glow at its leading edge, and the transformation intensity increases slightly each time the wave passes, implying multiple wave passes are needed to reach full elaboration rather than one single sweep. Phase 3 - Peak state: After the third wave pass completes, the person stands in a fully elaborate costume with rich texture and detail, the glow fading from the frame as the final wave exits off the right edge, the pose and stance unchanged from the opening frame. Guardrails: Each successive wave pass must visibly build on the previous level of detail rather than repeating the same transformation redundantly, and the light wave's leading edge must remain a clean vertical glow rather than a blurry smear that would hide the transformation timing. Keep the subject's proportions, facial identity, and stance completely stable across all three passes, and ensure the final costume reads as a coherent single design rather than mismatched fragments from different styles.", "bestFor": "Fantasy and costume brand promos, entertainment industry character reveals, themed event marketing.", "premium": true}, {"id": "spin-reveal-modern-to-vintage-era", "title": "Spin-Reveal, Modern to Vintage Era", "text": "Phase 1 - Hold: A person stands facing the camera in contemporary clothing, weight settled evenly, camera holding a steady static medium shot at eye level. Phase 2 - Transformation begins: The person begins a slow single rotation in place, and as their body turns away from camera the modern clothing on the now-hidden side resolves into vintage-era styling - the transformation occurring specifically during the portion of the turn where that section of the body is edge-on or momentarily obscured from direct view, so that by the time each section rotates back into camera view it has already changed. The rotation completes a full 360 degrees at a constant speed, with the back three-quarter view showing the vintage silhouette clearly established before the front comes back around. Phase 3 - Peak state: The person completes the rotation facing forward again, now fully in vintage-era styling - period-appropriate silhouette, fabric, and accessories - coming to a natural standing stop with a slight settle of the new garment's weight and drape. Guardrails: The transformation must be timed precisely to the portions of the rotation where the changing body section is least visible, never revealing a mid-change texture glitch on a side facing the camera directly. Keep the rotation speed constant and the person's balance and footing physically plausible throughout the turn, and ensure hair and accessories update in sync with the clothing rather than lagging behind or changing on a different schedule.", "bestFor": "Historical or period-drama promotional content, retro-themed fashion campaigns.", "premium": true}, {"id": "horizontal-ground-up-sweep-casual-to-ceremonial", "title": "Horizontal Ground-Up Sweep, Casual to Ceremonial", "text": "Phase 1 - Hold: A person stands barefoot or in simple shoes on plain ground, wearing casual everyday clothing, camera holding a static full-body shot with soft directional light. Phase 2 - Transformation begins: A glowing horizontal line begins at the ground beneath the person's feet and rises steadily upward, ceremonial-style footwear and leg coverings resolving first as the line passes the ankles and knees, then a more elaborate ceremonial garment resolving across the torso as the line continues upward past the waist and chest, finally reaching the shoulders and neckline last. Loose fabric elements like a sash or wrap visibly animate into place as the line passes, settling with a brief physical sway rather than snapping instantly into a fixed position. Phase 3 - Peak state: The glowing line passes over the top of the head, completing the transformation into full ceremonial dress, any headwear or hair styling settling into its final position as the glow fades upward and out of frame. Guardrails: The rising line must maintain even, level progression without stalling or skipping sections of the body, and every newly revealed garment layer must settle with believable fabric weight rather than appearing rigid or flat. Keep the person's footing and balance stable and their face unchanged throughout, and avoid the ceremonial garment's proportions clipping through the body or floating disconnected from the actual silhouette.", "bestFor": "Cultural celebration content, ceremonial and formal event marketing, heritage brand storytelling.", "premium": true}, {"id": "radial-ripple-from-center-minimalist-to-ornate", "title": "Radial Ripple from Center, Minimalist to Ornate", "text": "Phase 1 - Hold: A person stands centered in frame wearing simple, minimalist clothing in a single flat color, camera holding a static straight-on medium shot. Phase 2 - Transformation begins: A circular ripple originates at the chest and expands outward in concentric rings, each ring leaving increasingly ornate detail in its wake - the fabric nearest the origin point resolving into rich patterned texture first, with the rings traveling outward past the shoulders, down the arms, and down the torso until the entire garment has been touched by an expanding ring. The rings maintain a consistent expansion speed and a faint raised-relief distortion at their leading edge, giving the sense of detail physically blooming outward from a single point. Phase 3 - Peak state: The final ring passes beyond the fingertips and hem, dissipating off the edges of the body, leaving the person in a fully ornate version of the same garment silhouette, the pose completely unchanged from the opening frame. Guardrails: The concentric rings must expand at a mathematically consistent rate so they never appear to overtake or lag behind each other unevenly, and the ornate detail must originate strictly from the chest point outward rather than appearing in disconnected patches elsewhere on the body. Preserve the original garment's basic silhouette and cut so only surface detail and richness change, not the fundamental shape, and keep the subject's face and pose fully stable throughout the bloom.", "bestFor": "Luxury fashion reveal campaigns, jewelry and accessory brand content.", "premium": true}, {"id": "shadow-peel-transformation-contemporary-to-elaborate-costume", "title": "Shadow-Peel Transformation, Contemporary to Elaborate Costume", "text": "Phase 1 - Hold: A person stands in a single dramatic side-lit spotlight wearing contemporary clothing, a long cast shadow stretching across the floor behind them, camera holding a static low-angle shot. Phase 2 - Transformation begins: The cast shadow on the floor begins to lift and peel upward off the ground, wrapping around the person's silhouette like a dark overlay climbing from the feet upward, and everywhere the shadow-overlay passes over the body it leaves behind a fully realized elaborate costume in its place, the ordinary clothing visible only in the sections the shadow hasn't yet reached. The shadow-wrap climbs the body in an uneven, organic path rather than a straight line, reaching an arm before the opposite shoulder, mimicking how a shadow would naturally drape over a three-dimensional form. Phase 3 - Peak state: The shadow-wrap converges at the top of the head and dissolves into light, revealing the fully transformed elaborate costume under the same dramatic side lighting, the original cast shadow now reduced to a normal, proportionate shadow on the floor. Guardrails: The shadow-wrap's organic, uneven climb must still resolve every section of the body with no missed patches of untransformed clothing once it has passed, and the lighting direction on the newly revealed costume must match the established side-lit source exactly. Keep the person's stance and facial identity untouched, and ensure the shadow effect reads as a deliberate stylistic device rather than an unexplained dark visual artifact obscuring the subject.", "bestFor": "Dramatic entertainment reveals, theatrical or performance-brand promotional content.", "premium": true}, {"id": "water-line-sweep-swimwear-to-evening-wear", "title": "Water-Line Sweep, Swimwear to Evening Wear", "text": "Phase 1 - Hold: A person stands at the edge of a sunlit pool or shoreline in simple swimwear, camera holding a static medium-wide shot with light reflecting softly off a nearby water surface. Phase 2 - Transformation begins: A thin horizontal line of light reminiscent of a rising waterline begins at the feet and travels upward at a slow, steady pace, evening-wear fabric resolving fully within the line's narrow band as it passes - hemline, then waist, then bodice - each section catching a brief highlight of reflected light as it resolves, consistent with the poolside or shoreline setting's ambient light source. The person's stance remains fixed throughout, weight balanced evenly, only the rising line in motion. Phase 3 - Peak state: The line passes the shoulders and exits above the head, completing the shift into full evening wear, a light breeze animating the new fabric's hem for the first time as the transformation settles. Guardrails: The rising line's speed must stay constant with no acceleration or stutter, and the ambient reflected light on newly revealed fabric must match the established poolside or shoreline lighting rather than introducing a new, inconsistent light source. Keep the person's pose, balance, and facial identity fixed throughout, and ensure fabric drape and hemline behave with appropriate weight rather than appearing stiff or flat immediately after resolving.", "bestFor": "Resort and luxury travel brand campaigns, evening wear fashion advertising.", "premium": true}, {"id": "reverse-unravel-elaborate-to-minimalist", "title": "Reverse Unravel, Elaborate to Minimalist", "text": "Phase 1 - Hold: A person stands in an elaborate, richly detailed outfit with layered textures and ornamentation, camera holding a static medium shot under soft even light. Phase 2 - Transformation begins: Loose threads and decorative elements begin visibly unraveling from the outer edges of the garment first - cuffs, hem, and collar - the loosened material drifting away and fading out of frame as the underlying simpler garment beneath is progressively exposed, the unraveling spreading inward from the extremities toward the torso in a steady, continuous process rather than random patches falling away at once. Each unraveled section leaves a clean, finished edge on the simpler garment beneath rather than a frayed or unfinished boundary. Phase 3 - Peak state: The last decorative elements near the collar fade away, leaving the person in the plain minimalist garment, the same pose held throughout, a final small settle of the now-lighter fabric. Guardrails: The unraveling must proceed consistently from the extremities inward without decorative elements reappearing after they've already faded, and the newly exposed minimalist garment must look complete and intentional rather than like an unfinished or damaged version of the elaborate outfit. Keep the person's pose and identity completely stable, and ensure the drifting decorative fragments dissipate smoothly rather than freezing mid-frame or vanishing abruptly.", "bestFor": "Minimalist fashion brand campaigns, before/after style simplification content.", "premium": true}, {"id": "frame-edge-wipe-streetwear-to-formal-uniform", "title": "Frame-Edge Wipe, Streetwear to Formal Uniform", "text": "Phase 1 - Hold: A person stands in relaxed streetwear against a plain backdrop, weight shifted casually to one side, camera holding a static straight-on shot. Phase 2 - Transformation begins: A crisp vertical line of light sweeps in from the left edge of the frame at a steady constant pace, and the clothing directly behind the line resolves instantly into a structured formal uniform the moment the line passes over it, the streetwear visible only ahead of the line's position as it travels rightward across the body - one side of the torso, then the center, then the far arm. The person's posture visibly straightens slightly as the transformation reaches the torso and shoulders, implying the new structured garment is affecting their bearing in real time. Phase 3 - Peak state: The line exits the right edge of frame, the person now fully in the structured formal uniform standing with corrected, upright posture, a final small adjustment of the shoulders settling the new garment into place. Guardrails: The vertical wipe line must travel at a strictly even pace left to right with a clean, sharp edge, never doubling back or leaving a visible seam where it has already passed. The subtle posture shift accompanying the uniform's structure must happen gradually and plausibly rather than as a sudden unnatural snap, and the subject's facial identity must remain completely unaffected by the transformation.", "bestFor": "Institutional and professional branding content, uniform and workwear advertising.", "premium": true}]}
  ],
  "layerGuide": {
    "combos": "Pre-merged recipes - start here if you don't want to assemble prompts.",
    "camera": "Categories 01-03: subject-agnostic camera behavior.",
    "human": "Categories 04-05: face and body motion for portraits.",
    "atmosphere": "Categories 06-07, 16, 23: optional style and mood layers.",
    "vertical": "Categories 08-26: motion matched to what's in your photo.",
    "premium": "Categories 28-39: multi-phase transformation effects for premium users.",
  }
};
})(typeof window !== 'undefined' ? window : globalThis);
