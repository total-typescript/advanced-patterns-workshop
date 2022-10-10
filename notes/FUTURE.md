# TypeScript Advanced Patterns Workshop

## Things to add

1. Type predicates and assertion functions
1. Assertion functions in classes
1. Creating factories with top-level context (trpc context, for example)
1. Branded types
1. Builder pattern (transformers)
1. Using external libraries
1. Generics with Express
1. Generics with Zod
1. Conditional errors
1. Global types
1. Object coercion (maps)
1. Routers
1. Reducer
1. Usage with React?
1. Discriminated unions for props?

## Sections

### 1. Branded types

✅ Form validation - email & password
✅ Branded ids for data fetching (userId vs postId)
✅ ValidatedCurrency - using brands to figure out complicated payments logic
Cryptographically secure
✅ Branded objects (for confirmPassword/password validation)
Ints or Floats
✅ Records with different branded index signatures?

### 2. Global types

✅ Adding a function to global scope
✅ Adding to Window
✅ Adding to ProcessEnv (with namespaces)
✅ Custom global interfaces
✅ Custom JSX elements (as a challenge)

### 3. Type predicates and assertion functions

✅ Type predicates (with .filter)
✅ Assertion functions
Assertion functions _inside classes_
✅ Fixing the AWFUL asserts error
✅ Type predicates with generic inference
✅ Type predicates WITH branded types
✅ Assertion functions with branded types

### 4. Builder pattern

✅ Global context creator
✅ Solving partial inference with currying
✅ Classes which build generics on themselves
✅ Importance of default generics
✅ Middleware?

### 5. Usage with external libraries

With a simple external library
With a non-generic external library
✅ Extracting out library types with ReturnType/Parameters
✅ Usage with Express
✅ Usage with Zod

### 6. Identity Functions

✅ No generics on objects!
✅ F.Narrow vs as const
✅ F.NoInfer
✅ Lodash (MAYBE REVISIT AND ADD COMPLEXITY)

<!-- satisfies -->

<!-- Custom satisfies -->

### 7. Challenges

Build a reducer
Rebuild jQuery!

### Unknown bucket

FSM's in TypeScript?
