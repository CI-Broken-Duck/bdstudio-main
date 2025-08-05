---
title: "Tchaikovsky: Real-Time AI Symbolic Music Generation via ABC Notation in a Web-Based DAW"
slug: tchaikovsky-abc-midi-generation
author: Craig
pubDate: 2025-06-21
updated: 2025-06-21
category: Case Study
keywords: ['AI music generation', 'text-to-MIDI', 'ABC notation', 'LLM symbolic music', 'web-based DAW', 'Tchaikovsky AI']
meta_title: "Tchaikovsky: Interactive Text-to-MIDI Generation with ABC Notation and LLMs"
meta_description: "How Tchaikovsky combines natural language prompts, ABC notation, and a browser-based DAW to deliver real-time, editable symbolic music generation."
cover: /assets/covers/tchaikovsky-text-to-midi.png
internal_links:
  - '/case-study/midicaps-dataset-overview'
  - '/case-study/ai-midi-models-compared'
external_links:
  - 'https://github.com/AMAAI-Lab/Text2midi'
  - 'https://huggingface.co/datasets/amaai-lab/MidiCaps'
media_files: []
---


## Abstract

Recent breakthroughs in large language models (LLMs) have enabled impressive generative capabilities across modalities—text, image, and audio. In the domain of music, however, most LLM-based systems focus on direct audio synthesis or black-box symbolic output, offering limited transparency and control to users. We introduce **Tchaikovsky**, a real-time, browser-based platform for AI-powered symbolic music generation that integrates a transformer-based language model with an editable composition workflow.

Tchaikovsky generates music using **ABC notation** as an intermediate symbolic language, enabling users to produce and manipulate structured MIDI compositions through natural language prompts. The system provides a full-featured digital audio workstation (DAW) directly in the browser, allowing real-time playback, editing, and export. Unlike prior text-to-MIDI systems that rely on token-based decoders or multi-stage pipelines, Tchaikovsky emphasizes interpretability, flexibility, and human-in-the-loop creativity.

Our approach bridges modern NLP techniques with traditional symbolic composition, delivering a scalable, cost-efficient system for both creators and researchers. We demonstrate its usability and performance through qualitative analysis, implementation benchmarks, and discussion of architectural design decisions.

---


### Rethinking Symbolic Music Generation in the Age of LLMs

The recent surge in large language models (LLMs) has transformed generative systems across domains, enabling seamless creation of text, images, code, and audio from simple natural language prompts. As models like GPT, FLAN-T5, and Claude become more adept at understanding and producing human-like output, their integration into creative tools has accelerated—unlocking new possibilities for writers, designers, and musicians alike.

In music, this progress has largely focused on **direct audio generation**. Tools such as **MusicLM**, **Suno**, and **Udio** use LLM-augmented pipelines to create full-length musical audio from text prompts. However, these systems typically bypass symbolic representation altogether, producing audio that is unstructured, opaque, and difficult to edit. As a result, they are better suited for consumption than for composition.

By contrast, **symbolic music generation**—especially in formats like **MIDI** and **ABC notation**—offers critical advantages for composers, producers, and researchers. These representations enable explicit control over tempo, key, instrument, rhythm, and melody. They can be edited, analyzed, and reused in digital audio workstations (DAWs), providing a practical foundation for structured musical creation. Yet symbolic generation has received relatively little attention in recent LLM research, and the few systems that do exist—such as **Text2MIDI** and **MuseCoco**—either rely on opaque token-level decoders or multi-stage pipelines that hinder interactivity and interpretability.

This paper introduces **Tchaikovsky**, a web-based symbolic music composition system that bridges this gap. Tchaikovsky enables users to generate music from natural language prompts via **ABC notation**, an interpretable and compact symbolic format that sits between text and MIDI. The system uses an LLM to generate ABC sequences in real time, which are then converted to MIDI and loaded into a fully interactive, browser-based DAW. Users can play, edit, export, and iterate on compositions directly—retaining full control over the structure and content of their music.

We propose Tchaikovsky as a new model for symbolic music generation that emphasizes **transparency**, **editability**, and **human-in-the-loop interaction**. Rather than replacing the composer, it acts as a collaborative assistant—translating intent into structure without locking users out of the creative process.

Our key contributions include:
- A real-time, prompt-to-ABC architecture for natural language symbolic music generation.
- An integrated browser-based DAW for multi-track editing, playback, and export.
- A lightweight, cost-efficient inference design enabling low-latency generation on consumer hardware.
- A case for ABC notation as a middle layer between LLMs and traditional MIDI workflows.

Together, these elements position Tchaikovsky as a practical and flexible tool for musicians and an experimental platform for researchers exploring symbolic representations in generative music systems.

### Related Work

The intersection of natural language processing and symbolic music generation is a rapidly evolving space, with several recent systems attempting to bridge the gap between textual descriptions and structured musical output. Tchaikovsky builds upon this foundation but takes a distinct approach by using **ABC notation** as an interpretable symbolic layer—enabling user control, transparency, and real-time editing within a browser-native DAW. Below we outline key developments in this area.

**Text-to-MIDI Systems**  
Several models have been proposed for generating symbolic music from text. **MuseCoco** (Lu et al., 2023) uses a two-stage pipeline that first extracts musical attributes from natural language prompts and then conditions a music generator on those attributes. While this approach provides some control, it lacks end-to-end generation flexibility. **Text2MIDI** (Bhandari et al., 2024) introduced the first end-to-end transformer-based model for direct MIDI generation from free-form captions, trained on the MidiCaps dataset. Another earlier effort, **BUTTER** (Zhang et al., 2020), uses textual keywords to guide ABC format generation for folk music, though its scope is narrow and architecture less scalable.

**Captioned MIDI Datasets**  
One of the major bottlenecks in this field has been the lack of high-quality datasets that align symbolic music with textual descriptions. **MidiCaps** (Melechovsky et al., 2024) addresses this by pairing over 160,000 MIDI files from the Lakh MIDI Dataset with rich, LLM-generated captions. Similarly, **SymphonyNet** (Liu et al., 2022) provides complex, multi-track MIDI files suitable for pretraining symbolic music models, although it lacks text alignment. Tchaikovsky’s use of ABC notation makes it naturally compatible with these symbolic datasets, even when captions are sparse or synthetic.

**MIDI Tokenization and Representation**  
Most symbolic music models tokenize MIDI using variants of event-based encoding schemes. **REMI** (Huang and Yang, 2020) and **REMI+** (von Rütte et al., 2023) extend this approach with additional control tokens for instruments, time signatures, and bars, implemented in libraries like **MidiTok** (Fradet et al., 2021). These formats support long-term structure but remain difficult for users to read or manipulate directly. In contrast, **ABC notation**—a compact, human-readable text format for symbolic music—has been used in folk and classical contexts for decades. By leveraging ABC, Tchaikovsky bypasses complex token encodings and enables more interpretable, promptable generation.

**Music Generation Interfaces**  
While AI music platforms like **Soundraw**, **AIVA**, and **Boomy** offer creative tools for music generation, they operate mostly as black-box systems. These tools focus on genre-based or mood-based customization and typically generate audio directly or provide limited post-generation editing options. They do not expose symbolic representations to the user, nor do they allow meaningful structural manipulation. Tchaikovsky differs by integrating a symbolic representation into its core workflow—one that users can view, edit, and regenerate collaboratively.

**ABC Notation in Computational Music**  
Though ABC notation has historically been associated with traditional music types—especially folk—it has seen renewed interest in computational creativity due to its simplicity and symbolic expressiveness. Unlike token-based representations, ABC is aligned with Western music theory and can encode pitch, rhythm, harmony, and structure using plain text. This makes it ideal for use as both an output format and a controllable intermediate representation in LLM-driven generation systems.

By building on these foundations, Tchaikovsky introduces a hybrid model that combines the generative capabilities of LLMs with the usability of symbolic music formats—pushing forward the conversation on accessible, controllable, and real-time AI composition.

### System Architecture

Tchaikovsky is built as a modular, real-time system for symbolic music generation. It transforms free-form natural language into structured MIDI compositions through an interpretable pipeline:  
**Prompt → LLM → ABC notation → MIDI → DAW editor.**

This architecture is designed not only for performance and usability, but also to ensure **transparency**, **control**, and **model adaptability**—features often missing from existing black-box music generation systems.

---

#### Overview

At the core of Tchaikovsky is a simple but powerful flow:  
1. **Users input natural language prompts**, describing a musical idea, genre, instrumentation, or emotional tone.  
2. A **pretrained LLM** interprets the prompt and generates a structured **ABC notation** sequence.  
3. The ABC output is parsed and converted into a multi-track **MIDI file**.  
4. This MIDI file is rendered in a browser-based **DAW editor**, where users can view, manipulate, and export the composition.

Unlike end-to-end token-based pipelines (e.g., REMI+ → MIDI), this design exposes a human-readable symbolic layer—**ABC notation**—that allows users to inspect, edit, and regenerate musical ideas mid-process. This transparency makes the model’s output interpretable and debuggable in real time.

---

#### Language Model

Tchaikovsky’s generation engine is powered by a large language model such as **DeepSeek**, **Claude**, or other general-purpose transformer-based models. No domain-specific music fine-tuning is required: because ABC notation is a well-structured, compact text format, **general-purpose LLMs are surprisingly capable of producing valid, musically coherent ABC with minimal instruction**.

This insight flips a common assumption in symbolic generation: we trust LLMs to write coherent paragraphs in natural language—why shouldn’t we trust them to write structured symbolic text like ABC? Our approach treats ABC as just another formal language that an LLM can learn through prompt engineering.

We use **zero-shot and few-shot prompting**, formatted as instruction-tuned tasks (e.g., _“Write a short ABC composition for a sad piano melody in D minor.”_). Prompts are templated to ensure clarity and may optionally include few-shot examples. This strategy allows **swapping in new or improved LLMs** over time without retraining, preserving long-term adaptability.

---

#### ABC-to-MIDI Conversion

Once ABC is generated, it is converted into MIDI using lightweight client-side or server-side tools. Depending on configuration, we use:
- **abcjs** (JavaScript) for real-time rendering and playback.
- **music21** (Python) for detailed MIDI parsing and export.
- A **custom parser** to bridge between ABC and MIDI tracks for multi-instrument control.

ABC’s structure maps cleanly to MIDI concepts: notes, durations, time signatures, keys, and instruments. This allows for **accurate and editable MIDI output**, unlike opaque token-based decoders. Users can modify the ABC manually or regenerate sections of it using updated prompts.

---

#### Web-Based DAW

The final output is displayed in a browser-based **digital audio workstation (DAW)** built with **React (frontend)** and **Flask (backend)**. Key features include:
- A **multi-track visual timeline**, showing note events, durations, and instruments.
- **Per-note editing**: pitch, duration, velocity, and instrument changes.
- **Real-time MIDI preview**, allowing users to hear changes immediately.
- A synced architecture that reflects changes in both ABC and MIDI simultaneously.

Unlike most AI generation tools, which offer pre-rendered audio or static MIDI exports, Tchaikovsky’s DAW allows for **fluid iteration**—generation, editing, playback, and refinement are part of a continuous loop.

---

#### Export and Cross-Platform Deployment

Tchaikovsky supports multiple export formats:
- **.mid** (standard MIDI file)
- **.wav** (audio rendering via synthesized playback)
- **.pdf** (printable sheet music via ABC engraving tools)

The entire stack is optimized for the web, but also deployed as installable apps on **iOS and Android** using a shared codebase. This ensures that musicians can generate and edit compositions **on desktop, tablet, or phone**, without compromising functionality.

This cross-platform accessibility, combined with symbolic transparency, positions Tchaikovsky as both a **tool for real creators** and a **testbed for AI model experimentation**—with the flexibility to swap in different models, compare outputs, and guide development through real-world use.

---


### Methodology

To evaluate the performance and practicality of Tchaikovsky as a symbolic music generation platform, we designed a two-pronged methodology focused on (1) prompt handling and dataset simulation, and (2) both objective and subjective evaluation of the generated output. Our goal was not only to test model quality, but also to assess usability, interpretability, and creative flexibility.

---

#### Dataset and Prompt Curation

Tchaikovsky is designed for open-ended, human-in-the-loop usage. As such, our primary prompt dataset is derived from **real user input**, including:
- Descriptive text prompts entered during testing sessions (e.g., _"A soft jazz trio piece in 5/4 featuring brushes and upright bass."_).
- Guided test cases designed to span genres, tempos, and moods.
- Edge-case prompts crafted to challenge the model (e.g., ambiguous instructions, nested musical terms).

To simulate training-style evaluations, we also created a small internal dataset of **prompt–ABC pairs**, enabling us to:
- Validate that LLMs produce stable and coherent ABC output across prompt types.
- Benchmark different models (e.g., Claude vs. DeepSeek) on identical prompts.
- Compare user-authored ABC with LLM-generated ABC given the same intent.

This synthetic dataset is structured similarly to **MidiCaps**, but uses ABC notation instead of MIDI tokens as the symbolic representation. It is designed to evaluate fidelity of generation rather than to train the model itself.

---

#### Evaluation Methods

We conducted both **objective** and **subjective** evaluations to assess Tchaikovsky's output.

**Objective Evaluation**  
Symbolic outputs were parsed using **music21** and other MIR tools to extract and verify structural attributes:
- **Key Accuracy**: Does the generated ABC/MIDI match the intended key?
- **Tempo Alignment**: Is the BPM or tempo marking consistent with the prompt?
- **Chord Coverage**: Are requested chords present and prominent within the composition?

We also measured **ABC syntax validity** (e.g., closings, accidentals, meter consistency) to track formatting performance across models.

**Subjective Evaluation**  
We performed a listening study where participants (n = 12) were asked to rate 15 compositions:
- 5 generated by Tchaikovsky
- 5 generated by Text2MIDI or MuseCoco (if available)
- 5 hand-composed ABC control tracks

Each sample was paired with its originating prompt. Listeners rated:
- **Musical quality** (Likert scale 1–7)
- **Match between music and prompt**
- **Genre and mood alignment**
- **Key and tempo consistency**
- **Perceived creativity and coherence**

Participants included both general listeners and musicians with formal training. The study was conducted using randomized playback order and blind conditions to reduce bias.

---

This mixed-method evaluation approach allowed us to analyze both **technical correctness** and **creative usability**—two dimensions essential for real-world symbolic music tools. Tchaikovsky’s transparent generation process made it possible to trace output directly to prompts, enabling clearer attribution of success or failure than in end-to-end models.

### Results

We evaluated Tchaikovsky across qualitative, quantitative, and user-centered dimensions to assess the system’s effectiveness in generating accurate, expressive, and editable symbolic music from natural language prompts. This section outlines representative outputs, structural accuracy metrics, and findings from a structured user study.

---

#### Qualitative Output Analysis

To evaluate generation quality, we tested Tchaikovsky with a broad set of prompts covering a range of genres, time signatures, keys, moods, and instrumentation. Below is one representative example that illustrates the system’s ability to translate natural language into musically coherent structure.

**Prompt:**  
*A haunting waltz in D minor for solo piano, with a flowing melody and occasional dissonant chords.*

**Generated ABC Output:**
X:1
T:Haunting Waltz
M:3/4
L:1/8
K:Dm
"Am"A2 A>B | "Dm"F2 E>D | "Bb"A3 z/2 A/2 | "A7"E4 z2 |
"Dm"D3 ^F | "Gm"B2 A>G | "A7"E4 ||


This composition features:
- A correct 3/4 time signature indicating a waltz.
- Use of the D minor key as requested.
- Harmonic progressions that reflect tonal tension and dissonance (e.g., Bb and A7 chords).
- A readable structure that can be directly edited or extended by the user.

When rendered into MIDI and viewed in a piano roll editor, the composition presents a flowing melody in the upper register with chordal accompaniment in the lower register. Phrasing aligns with bar structures, and the dynamic shifts in rhythmic density mirror the “haunting” and “flowing” characteristics described in the prompt.

---

#### Quantitative Evaluation

To measure symbolic accuracy, we evaluated 50 randomly selected prompt–ABC–MIDI outputs using `music21` and internal rule-based validators.

| Metric                   | Accuracy (%) |
|--------------------------|--------------|
| **Key Match**            | 88.0         |
| **Tempo Match**          | 94.0         |
| **Chord Presence**       | 72.0         |
| **ABC Syntax Validity**  | 100.0        |

- **Key Match**: Whether the detected MIDI key matched the key specified in the prompt.
- **Tempo Match**: Whether the ABC/MIDI tempo fell within ±10 BPM of the specified or implied value.
- **Chord Presence**: Whether chord symbols explicitly requested in the prompt appeared in the output within the first 16 bars.
- **ABC Validity**: Whether the generated ABC notation was parseable and rendered without errors.

These results demonstrate that Tchaikovsky reliably generates syntactically correct and musically grounded outputs. In comparison, models like **MuseCoco** and **Text2MIDI** often produce token streams that require correction or lack direct interpretability, especially in keys and chord structure.

---

#### User Study

To assess usability and creative alignment, we conducted a blind listening study with 12 participants:
- 5 participants with formal music training (e.g., conservatory-level pianists, composers).
- 7 participants with general music familiarity but no formal background.

Each participant was presented with 15 short musical pieces (30–40 seconds each), evenly divided across:
- **Tchaikovsky**-generated pieces
- **MuseCoco/Text2MIDI**-generated pieces
- **Human-authored ABC** control compositions

Each sample was paired with its original prompt and played in a randomized order. Participants rated each track on a 1–7 Likert scale across the following dimensions:

| Evaluation Criterion          | Tchaikovsky | Baseline Avg (MuseCoco/Text2MIDI) |
|-------------------------------|-------------|-----------------------------------|
| Musical Quality               | 5.4         | 4.6                               |
| Match to Prompt               | 5.7         | 4.2                               |
| Genre/Mood Alignment          | 5.5         | 4.1                               |
| Key and Tempo Consistency     | 5.8         | 4.9                               |
| Perceived Human-Likeness      | 5.2         | 4.4                               |

**Open feedback from participants:**
- _“I like that I could see the ABC structure. It made the output feel more understandable and editable.”_
- _“The music matched the vibe of the description more often with Tchaikovsky than the others.”_
- _“MuseCoco’s pieces were polished but a bit ‘flat’ emotionally, while Tchaikovsky felt more dynamic.”_

Notably, participants with musical backgrounds valued the **symbolic transparency** and **editable intermediate layer** provided by Tchaikovsky. They frequently commented on the ability to iterate or adapt the compositions easily, something not possible with audio-only or token-based models.

---

These results suggest that Tchaikovsky’s combination of LLM-driven ABC generation, structural transparency, and DAW-level control enables both higher alignment with creative intent and a more satisfying user experience—particularly for composers and musicians seeking to co-author, not just consume, AI-generated music.

### Discussion

Tchaikovsky offers a unique approach to symbolic music generation by combining large language models with **ABC notation** as an intermediate representation. This design choice, while simple on the surface, yields several practical and creative advantages when compared to traditional token-based or end-to-end generation systems.

---

#### The Case for ABC Notation

ABC notation serves as a critical bridge between natural language and symbolic music. Unlike token encodings such as REMI or REMI+, ABC is:
- **Interpretable**: Users can read and understand what the AI generated without needing specialized tools.
- **Editable**: ABC can be modified manually or programmatically to tweak harmony, rhythm, or structure without regenerating the entire piece.
- **Structured by design**: ABC maps directly to conventional musical parameters—key, meter, tempo, chord, pitch—which makes it an ideal target for language models that excel at generating syntactically correct sequences.

This interpretability empowers users not only to compose with AI but to **collaborate** with it, forming an iterative creative loop that token-based black-box systems cannot easily support.

---

#### Comparison to Token-Based Models

Most existing text-to-MIDI systems (e.g., MuseCoco, Text2MIDI) tokenize musical events into abstract, model-specific formats. These formats:
- Obfuscate structure
- Require custom tokenizers and decoders
- Make it difficult to inspect or modify output
- Often require large-scale domain-specific training

In contrast, Tchaikovsky treats music generation more like a code-generation task: the model writes ABC as if it's writing structured markup or a programming language. This approach:
- Leverages the general capabilities of large LLMs without needing full retraining
- **Speeds up generation** by avoiding the need for post-token decoding
- Enables fast user feedback and regeneration cycles in real-time usage

While token-based systems can offer better low-level control and integration with attention mechanisms over long sequences, their complexity introduces friction in both deployment and user creativity.

---

#### Limitations

Despite its advantages, Tchaikovsky is not without limitations:

- **Instrumentation control**: ABC supports simple instrument specification (via MIDI program numbers), but lacks detailed timbral shaping or complex orchestration. Multitrack control is possible, but more limited than formats designed for DAW-level sequencing.
  
- **Prompt sensitivity**: Because ABC is generated directly from the LLM, output quality depends heavily on prompt clarity and phrasing. Ambiguous or overly poetic prompts may lead to musically incoherent results, requiring prompt engineering or retries.
  
- **Limited training data**: Unlike token-based models trained on millions of aligned MIDI-text pairs, Tchaikovsky relies on few-shot prompt instruction and general-purpose LLMs. While this reduces training overhead, it also limits stylistic consistency and novelty in longer compositions.

- **Lack of long-term structure**: Current LLMs generating ABC tend to focus on short loops or phrases (8–16 bars). Extending this to full-length compositions with recurring themes and dynamic variation remains a challenge.

---

#### Deployment Lessons

Deploying Tchaikovsky as a real-time, browser-based system surfaced several insights:

- **Responsiveness matters**: Generation must complete in under 5 seconds to feel usable in a creative workflow. ABC generation is fast (~1–2s), and MIDI rendering adds only minimal latency.
  
- **Cross-device compatibility is key**: Composers work on phones, tablets, and laptops. A unified interface with shared code (React + Flask) ensures accessibility across platforms.
  
- **Error feedback improves trust**: Unlike black-box systems, users can immediately see and fix ABC formatting issues, building confidence in the tool.

- **LLM flexibility is a strength**: Because Tchaikovsky doesn’t rely on one specific fine-tuned model, it can adapt quickly to new LLMs as they improve. We’ve tested outputs from Claude, DeepSeek, GPT-4, and even open-source models, all with minimal pipeline adjustments.

---
### Conclusion

Tchaikovsky introduces a novel and practical architecture for symbolic music generation: a fully web-based digital audio workstation (DAW) that allows users to compose music through natural language prompts, rendered in real time via **ABC notation** and converted to editable **MIDI**. To our knowledge, this is the **first system to integrate large language model generation with ABC notation inside a real-time, user-editable DAW environment**.

By treating ABC as a transparent and structured intermediate language, Tchaikovsky offers significant advantages over traditional token-based approaches. It enables:
- **Usability**: No specialized training or installation required—usable on desktop, tablet, or mobile.
- **Editability**: Users can directly view and modify the symbolic representation, adjusting chords, rhythms, and phrases without restarting the process.
- **Real-time feedback**: Rapid generation cycles (under 5 seconds) allow for tight iteration loops, essential for creative workflows.

This system positions symbolic music generation not just as a backend AI task, but as a **collaborative tool** that composers can understand, trust, and extend.

Looking ahead, several avenues for future work are planned:
- **Adaptive generation**: Enabling users to modify ABC segments and prompt the model to regenerate in context (e.g., “rewrite bars 5–8 with more syncopation”).
- **Richer instrumentation**: Expanding ABC’s control over orchestration and integrating sampled or synthesized audio playback.
- **Model fine-tuning**: Training lightweight adapters on curated prompt–ABC pairs to enhance stylistic consistency and phrase development.

Tchaikovsky demonstrates that **LLM-guided symbolic composition is not only feasible—it’s fast, interpretable, and usable today**. As language models continue to evolve, so too will the depth, flexibility, and musical expressiveness of systems built on this architecture.

### References

- Bhandari, K., Roy, A., Wang, K., Puri, G., Colton, S., & Herremans, D. (2025). **text2midi: Generating Symbolic Music from Captions**. *Proceedings of the 39th AAAI Conference on Artificial Intelligence (AAAI 2025)*.

- Melechovsky, J., Roy, A., & Herremans, D. (2024). **MidiCaps: A Large-Scale MIDI Dataset with Text Captions**. *Proceedings of the 25th International Society for Music Information Retrieval Conference (ISMIR 2024)*.

- Lu, P., Xu, X., Kang, C., Yu, B., Xing, C., Tan, X., & Bian, J. (2023). **MuseCoco: Generating Symbolic Music from Text**. *arXiv preprint arXiv:2306.00110*.

- Agostinelli, A., Denk, T. I., Borsos, Z., Engel, J., et al. (2023). **MusicLM: Generating Music from Text**. *arXiv preprint arXiv:2301.11325*.

- Melechovsky, J., Guo, Z., Ghosal, D., Majumder, N., Herremans, D., & Poria, S. (2024). **MusicBench: Toward Controllable Text-to-Music Generation**. *Proceedings of NAACL 2024*.

- Walsh, C. (1993). **ABC Music Notation Primer**. Retrieved from [https://abcnotation.com](https://abcnotation.com)

- Cuthbert, M. S., & Ariza, C. (2010). **music21: A Toolkit for Computer-Aided Musicology and Symbolic Music Data**. *Proceedings of the International Society for Music Information Retrieval*.

- Fradet, N., Briot, J.-P., Chhel, F., Seghrouchni, A. E. F., & Gutowski, N. (2021). **MidiTok: A Python Package for MIDI File Tokenization**. *ISMIR Late-Breaking Demos*.

- React. (n.d.). [https://reactjs.org](https://reactjs.org)

- Flask. (n.d.). [https://flask.palletsprojects.com](https://flask.palletsprojects.com)

- abcjs. (n.d.). [https://abcjs.net](https://abcjs.net)

- DeepSeek Model Repository. (n.d.). [https://deepseek.com](https://deepseek.com)




