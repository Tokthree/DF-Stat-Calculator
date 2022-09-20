# DF-Stat-Calculator
A new stat calculator for Dead Frontier 3D.

Currently in development. All of the major features are implemented and it is styled to somewhat match Dead Frontier Profiler.  
Current Implemented Features:
  - Level, Class, Stat, Proficiency and Equipment Enhancement entry.
  - Stat Point, Proficiency Point and Level Requirement display.
  - Armor and Weapon selection.
  - Detailed information regarding Character, Armor and Weapon statistics (Health, Speed, DPS, etc.)
  - Implant, GM, UB and Clan Boost selection/entry.
  - Total boost display.
  - Real-time calculation of all displayed values.

Current Missing & Planned Features:
  - Armor Effective Durability display based on IDR and Absorption (currently only base durability is shown).
  - DPH stat for Explosive weapons when hitting max targets.
  - Cleave information for Melee weapons.
  - Implant Slot hiding based on entered Level.
  - Implant Selection based on exclusivity of Selected Implants (e.g. no Versatility with Jack of All, no duplicates of Unique Implants).
  
Current Best Implementation Features:
  - DPS for Burst Weapons (no publically available formulae for how it is calculated, currently assuming it is calculated the same as normal Weapons. Aware of the burst_duration stat on the allstats page, but not sure how to add it to the formulae).
