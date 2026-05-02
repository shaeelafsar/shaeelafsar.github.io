# Contact (`/contact`) Wireframe

## Page stack

`ContactHero` → `ContactLayout` (`ContactForm` + `SocialLinksPanel`)

## Mobile — 375px

```text
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ ContactHero                         │
│ [fade-in] H1 Contact                │
│ [fade-in] intro copy                │
├─────────────────────────────────────┤
│ SocialLinksPanel                    │
│ GitHub                              │
│ LinkedIn                            │
│ Twitter/X                           │
│ Email                               │
├─────────────────────────────────────┤
│ ContactForm                         │
│ [stagger] Name input                │
│ [stagger] Email input               │
│ [stagger] Subject input             │
│ [stagger] Message textarea          │
│ [stagger] Submit button             │
│ success / error message region      │
└─────────────────────────────────────┘
```

## Tablet — 768px

```text
┌──────────────────────────────────────────────────────────────┐
│ ContactHero                                                  │
│ [fade-in] H1 + supporting text                               │
├──────────────────────────────────────────────────────────────┤
│ ContactLayout                                                │
│ SocialLinksPanel above or beside ContactForm                 │
│ ContactForm keeps generous vertical spacing                  │
└──────────────────────────────────────────────────────────────┘
```

## Desktop — 1280px

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ContactHero                                                                  │
│ [fade-in] H1 Contact                                                         │
│ [fade-in] calm invitation / expectation setting                              │
├──────────────────────────────────────────────────────────────────────────────┤
│ ContactLayout                                                                │
│ ┌────────────────────────────────────┬─────────────────────────────────────┐ │
│ │ ContactForm                        │ SocialLinksPanel                    │ │
│ │ [stagger] name                     │ profile links                       │ │
│ │ [stagger] email                    │ availability note                   │ │
│ │ [stagger] subject                  │ response-time copy                  │ │
│ │ [stagger] message                  │ optional location / email           │ │
│ │ [stagger] submit                   │                                     │ │
│ │ inline validation / status region  │                                     │ │
│ └────────────────────────────────────┴─────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

## Navigation flow

- Social links exit to external profiles or mail client
- Successful form submission keeps user on `/contact`
- Header/footer continue cross-page navigation
