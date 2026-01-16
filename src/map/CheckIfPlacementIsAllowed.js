export default function CheckIfPlacementIsAllowed(isDropLocked) {
  if (isDropLocked) {
    console.log("Placement blocked: User has already dropped a GIF.");
    return false;
  }
  return true;
}
