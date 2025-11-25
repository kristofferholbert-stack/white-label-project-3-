import re

def load_file(filepath):
    with open(filepath, 'r') as f:
        return f.read()

def extract_all_solutions_ids(content):
    # Regex to find id: '...' inside ALL_SOLUTIONS array
    # This is a heuristic, assuming id is the first key or close to it in the object definition inside the list
    # A more robust way is to find the ALL_SOLUTIONS block and parse it.

    # Find the ALL_SOLUTIONS block
    start_match = re.search(r'export const ALL_SOLUTIONS: Solution\[\] = \[', content)
    if not start_match:
        print("Could not find ALL_SOLUTIONS start")
        return []

    # We will just scan for all "id: '...'" in the file, but that might capture other ids.
    # Let's try to be more specific.

    ids = set()
    # Find all occurrences of id: '...'
    all_ids = re.findall(r"id:\s*'([^']+)'", content)

    # This captures everything, including stack ids, blog ids etc.
    # However, we know the new IDs we added: zappychat, uphex, nicejob, klaviyo, postscript
    # We can just check if they are present in the file at all first as a sanity check.

    return all_ids

def verify_solution_existence(content, solution_id):
    # We want to ensure it is defined in ALL_SOLUTIONS.
    # We can search for the specific block.
    pattern = r"id:\s*'" + re.escape(solution_id) + r"'"
    if re.search(pattern, content):
        return True
    return False

def verify_stack_solutions(content, stack_id, expected_solution_ids):
    # Find the stack definition
    stack_start = content.find(f"id: '{stack_id}'")
    if stack_start == -1:
        print(f"Stack {stack_id} not found")
        return False

    # Look ahead for solutionIds
    solution_ids_match = re.search(r"solutionIds:\s*\[([^\]]+)\]", content[stack_start:])
    if not solution_ids_match:
        print(f"solutionIds not found for {stack_id}")
        return False

    found_ids_str = solution_ids_match.group(1)
    found_ids = [x.strip().strip("'").strip('"') for x in found_ids_str.split(',')]

    # Check if found_ids match expected (order doesn't matter for correctness usually, but here likely exact match)
    # The user provided specific lists.

    print(f"Stack {stack_id}: Found {found_ids}, Expected {expected_solution_ids}")

    missing = [sid for sid in expected_solution_ids if sid not in found_ids]
    if missing:
        print(f"Missing expected IDs in {stack_id}: {missing}")
        return False

    unexpected = [sid for sid in found_ids if sid not in expected_solution_ids]
    if unexpected:
        print(f"Unexpected IDs in {stack_id}: {unexpected}")
        return False

    return True

def main():
    filepath = 'constants.ts'
    content = load_file(filepath)

    # 1. Check new solutions exist
    new_solutions = ['zappychat', 'uphex', 'nicejob', 'klaviyo', 'postscript']
    all_passed = True
    for sol in new_solutions:
        if verify_solution_existence(content, sol):
            print(f"SUCCESS: Solution '{sol}' found.")
        else:
            print(f"FAILURE: Solution '{sol}' NOT found.")
            all_passed = False

    # 2. Check stack solutionIds
    stacks_to_check = {
        'stack-reactivation': ['gohighlevel', 'zappychat', 'uphex'],
        'stack-invisible-seo': ['nicejob', 'seoreseller'],
        'stack-ecom-retention': ['klaviyo', 'postscript', 'invisible-ppc']
    }

    for stack_id, expected_ids in stacks_to_check.items():
        if verify_stack_solutions(content, stack_id, expected_ids):
             print(f"SUCCESS: Stack '{stack_id}' has correct solutions.")
        else:
             print(f"FAILURE: Stack '{stack_id}' incorrect.")
             all_passed = False

    if all_passed:
        print("\nAll checks passed!")
    else:
        print("\nSome checks failed.")
        exit(1)

if __name__ == "__main__":
    main()
